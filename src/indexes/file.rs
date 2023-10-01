use std::{
    path::{Path, PathBuf},
    sync::{
        atomic::{AtomicU64, Ordering},
        Arc,
    },
};

use anyhow::{bail, Result};
use async_trait::async_trait;
use tantivy::{doc, schema::Schema, IndexWriter, Term};
use tracing::{info, warn};

use crate::repo::{
    filesystem::MAX_LINE_COUNT,
    iterator::{FileSource, RepositoryDirectory, RepositoryFile},
};
use crate::{
    application::background::SyncPipes,
    repo::{
        filesystem::{BranchFilter, FileWalker, GitWalker},
        iterator::RepoDirectoryEntry,
        types::{RepoMetadata, RepoRef, Repository},
    },
    state::schema_version::get_schema_version,
};

use super::{
    caching::{CacheKeys, FileCache, FileCacheSnapshot},
    indexer::Indexable,
    schema::File,
};

struct Workload<'a> {
    cache: &'a FileCacheSnapshot<'a>,
    repo_disk_path: &'a Path,
    repo_name: &'a str,
    repo_metadata: &'a RepoMetadata,
    repo_ref: String,
    relative_path: PathBuf,
    normalized_path: PathBuf,
}

impl<'a> Workload<'a> {
    fn cache_keys(&self, dir_entry: &RepoDirectoryEntry) -> CacheKeys {
        let semantic_hash = {
            let mut hash = blake3::Hasher::new();
            hash.update(get_schema_version().as_bytes());
            hash.update(self.relative_path.to_string_lossy().as_ref().as_ref());
            hash.update(self.repo_ref.as_bytes());
            hash.update(dir_entry.buffer().unwrap_or_default().as_bytes());
            hash.finalize().to_hex().to_string()
        };

        let tantivy_hash = {
            let mut hash = blake3::Hasher::new();
            hash.update(semantic_hash.as_ref());
            hash.finalize().to_hex().to_string()
        };

        CacheKeys::new(tantivy_hash)
    }
}

#[async_trait]
impl Indexable for File {
    async fn index_repository(
        &self,
        reporef: &RepoRef,
        repo: &Repository,
        repo_metadata: &RepoMetadata,
        writer: &IndexWriter,
        pipes: &SyncPipes,
    ) -> Result<()> {
        // TODO(skcd): Implement this
        let file_cache = Arc::new(FileCache::for_repo(&self.sql, reporef));
        let cache = file_cache.retrieve().await;
        let repo_name = reporef.indexed_name();
        let processed = &AtomicU64::new(0);

        let file_worker = |count: usize| {
            let cache = &cache;
            move |dir_entry: RepoDirectoryEntry| {
                let completed = processed.fetch_add(1, Ordering::Relaxed);
                pipes.index_percent(((completed as f32 / count as f32) * 100f32) as u8);

                let entry_disk_path = dir_entry.path().unwrap().to_owned();
                let relative_path = {
                    let entry_srcpath = PathBuf::from(&entry_disk_path);
                    entry_srcpath
                        .strip_prefix(&repo.disk_path)
                        .map(ToOwned::to_owned)
                        .unwrap_or(entry_srcpath)
                };
                let normalized_path = repo.disk_path.join(&relative_path);

                let workload = Workload {
                    repo_disk_path: &repo.disk_path,
                    repo_ref: reporef.to_string(),
                    repo_name: &repo_name,
                    relative_path,
                    normalized_path,
                    repo_metadata,
                    cache,
                };

                if let Err(err) = self.worker(dir_entry, workload, writer) {
                    warn!(%err, entry_disk_path, "indexing failed; skipping");
                }

                // TODO(codestory): Enable embedding queue later on
                // if let Err(err) = cache.parent().process_embedding_queue() {
                //     warn!(?err, "failed to commit embeddings");
                // }
            }
        };

        let start = std::time::Instant::now();

        // If we could determine the time of the last commit, proceed
        // with a Git Walker, otherwise use a FS walker
        if repo_metadata.last_commit_unix_secs.is_some() {
            let walker = GitWalker::open_repository(reporef, &repo.disk_path, BranchFilter::Head)?;
            let count = walker.len();
            walker.for_each(pipes, file_worker(count));
        } else {
            let walker = FileWalker::index_directory(&repo.disk_path);
            let count = walker.len();
            walker.for_each(pipes, file_worker(count));
        };

        if pipes.is_cancelled() {
            bail!("cancelled");
        }

        info!(?repo.disk_path, "repo file indexing finished, took {:?}", start.elapsed());

        file_cache
            .synchronize(cache, |key| {
                writer.delete_term(Term::from_field_text(self.unique_hash, key));
            })
            .await?;

        pipes.index_percent(100);
        Ok(())
    }

    fn delete_by_repo(&self, writer: &IndexWriter, repo: &Repository) {
        writer.delete_term(Term::from_field_text(
            self.repo_disk_path,
            &repo.disk_path.to_string_lossy(),
        ));
    }

    fn schema(&self) -> Schema {
        self.schema.clone()
    }
}

impl File {
    fn worker(
        &self,
        dir_entry: RepoDirectoryEntry,
        workload: Workload<'_>,
        writer: &IndexWriter,
    ) -> Result<()> {
        let cache_keys = workload.cache_keys(&dir_entry);
        let last_commit = workload.repo_metadata.last_commit_unix_secs.unwrap_or(0);

        match dir_entry {
            _ if workload.cache.is_fresh(&cache_keys) => {
                info!("fresh; skipping");
                return Ok(());
            }
            RepoDirectoryEntry::Dir(dir) => {
                let doc = dir.build_document(self, &workload, last_commit, &cache_keys);
                writer.add_document(doc)?;
            }
            RepoDirectoryEntry::File(file) => {
                let doc = file
                    .build_document(
                        self,
                        &workload,
                        &cache_keys,
                        last_commit,
                        workload.cache.parent(),
                    )
                    .ok_or(anyhow::anyhow!("failed to build document"))?;
                writer.add_document(doc)?;
            }
            RepoDirectoryEntry::Other => {
                anyhow::bail!("dir entry was neither a file nor a directory")
            }
        }

        Ok(())
    }
}

impl RepositoryFile {
    #[allow(clippy::too_many_arguments)]
    fn build_document(
        mut self,
        schema: &File,
        workload: &Workload<'_>,
        cache_keys: &CacheKeys,
        last_commit: i64,
        file_cache: &FileCache,
    ) -> Option<tantivy::schema::Document> {
        let Workload {
            relative_path,
            repo_name,
            repo_disk_path,
            repo_ref,
            normalized_path,
            ..
        } = workload;

        let relative_path_str = format!("{}/", relative_path.to_string_lossy());
        #[cfg(windows)]
        let relative_path_str = relative_path_str.replace('\\', "/");

        // add an NL if this file is not NL-terminated
        if !self.buffer.ends_with('\n') {
            self.buffer += "\n";
        }

        let line_end_indices = self
            .buffer
            .match_indices('\n')
            .flat_map(|(i, _)| u32::to_le_bytes(i as u32))
            .collect::<Vec<_>>();

        // Skip files that are too long. This is not necessarily caught in the filesize check, e.g.
        // for a file like `vocab.txt` which has thousands of very short lines.
        if line_end_indices.len() > MAX_LINE_COUNT as usize {
            return None;
        }

        let lines_avg = self.buffer.len() as f64 / self.buffer.lines().count() as f64;

        // Get the language of the file
        let language = hyperpolyglot::detect(&self.pathbuf)
            .unwrap_or(None)
            .map(|detection| detection.language().to_ascii_lowercase())
            .unwrap_or("not_detected_language".to_owned());

        // TODO(skcd): Process the semantic layer here, and then process the semantic
        // backend and do the embedding
        // if schema.semantic.is_some() {
        //     tokio::task::block_in_place(|| {
        //         Handle::current().block_on(async {
        //             file_cache
        //                 .process_semantic(
        //                     cache_keys,
        //                     repo_name,
        //                     repo_ref,
        //                     &relative_path_str,
        //                     &self.buffer,
        //                     lang_str,
        //                     &self.branches,
        //                 )
        //                 .await;
        //         })
        //     });
        // }

        Some(doc!(
            schema.raw_content => self.buffer.as_bytes(),
            schema.raw_repo_name => repo_name.as_bytes(),
            schema.raw_relative_path => relative_path_str.as_bytes(),
            schema.unique_hash => cache_keys.tantivy(),
            schema.repo_disk_path => repo_disk_path.to_string_lossy().as_ref(),
            schema.relative_path => relative_path_str,
            schema.repo_ref => repo_ref.as_str(),
            schema.repo_name => *repo_name,
            schema.content => self.buffer,
            schema.line_end_indices => line_end_indices,
            schema.lang => language.as_bytes(),
            schema.avg_line_length => lines_avg,
            schema.last_commit_unix_seconds => last_commit,
            schema.symbols => String::default(),
            schema.branches => "HEAD".to_owned(),
            schema.is_directory => false,
        ))
    }
}

impl RepositoryDirectory {
    #[allow(clippy::too_many_arguments)]
    fn build_document(
        self,
        schema: &File,
        workload: &Workload<'_>,
        last_commit: i64,
        cache_keys: &CacheKeys,
    ) -> tantivy::schema::Document {
        let Workload {
            relative_path,
            repo_name,
            repo_disk_path,
            repo_ref,
            ..
        } = workload;

        let relative_path_str = format!("{}/", relative_path.to_string_lossy());
        #[cfg(windows)]
        let relative_path_str = relative_path_str.replace('\\', "/");

        doc!(
                schema.raw_repo_name => repo_name.as_bytes(),
                schema.raw_relative_path => relative_path_str.as_bytes(),
                schema.repo_disk_path => repo_disk_path.to_string_lossy().as_ref(),
                schema.relative_path => relative_path_str,
                schema.repo_ref => repo_ref.as_str(),
                schema.repo_name => *repo_name,
                schema.last_commit_unix_seconds => last_commit,
                schema.branches => "HEAD".to_owned(),
                schema.is_directory => true,
                schema.unique_hash => cache_keys.tantivy(),

                // nulls
                schema.raw_content => Vec::<u8>::default(),
                schema.content => String::default(),
                schema.line_end_indices => Vec::<u8>::default(),
                schema.lang => Vec::<u8>::default(),
                schema.avg_line_length => f64::default(),
                schema.symbols => String::default(),
        )
    }
}

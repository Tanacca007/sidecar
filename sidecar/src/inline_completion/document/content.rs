//! We keep track of the document lines properly, so we can get data about which lines have been
//! edited and which are not changed, this way we can know which lines to keep track of

use lazy_static::lazy_static;
use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
    time::Instant,
};

use regex::Regex;
use tree_sitter::Tree;

use crate::{
    chunking::{
        editor_parsing::EditorParsing,
        text_document::{Position, Range},
    },
    inline_completion::helpers::split_on_lines_editor_compatiable,
};

lazy_static! {
    static ref SPLITTING_WORDS: Regex = Regex::new(r"[^a-zA-Z0-9]+").unwrap();
}

fn split_into_words(e: &str) -> Vec<String> {
    SPLITTING_WORDS
        .split(e)
        .filter_map(|word| {
            let cleaned_word = word.trim();
            if !cleaned_word.is_empty() {
                Some(cleaned_word.to_string())
            } else {
                None
            }
        })
        .collect()
}

fn split_into_hashset(lines: Vec<String>) -> HashSet<String> {
    let mut final_content: HashSet<String> = Default::default();
    lines.into_iter().for_each(|line| {
        let words = split_into_words(&line);
        words.into_iter().for_each(|word| {
            final_content.insert(word);
        })
    });
    final_content
}

#[derive(Debug, Clone)]
pub struct SnippetInformationWithScope {
    snippet_information: SnippetInformation,
    score: f32,
    file_path: String,
}

impl SnippetInformationWithScope {
    pub fn score(&self) -> f32 {
        self.score
    }

    pub fn snippet_information(&self) -> &SnippetInformation {
        &self.snippet_information
    }

    pub fn file_path(&self) -> &str {
        &self.file_path
    }
}

#[derive(Debug, Clone)]
pub struct SnippetInformation {
    snippet_lines: Vec<String>,
    start_line: usize,
    end_line: usize,
}

impl SnippetInformation {
    pub fn new(snippet_lines: Vec<String>, start_line: usize, end_line: usize) -> Self {
        SnippetInformation {
            snippet_lines,
            start_line,
            end_line,
        }
    }

    pub fn snippet(&self) -> String {
        self.snippet_lines.join("\n")
    }

    pub fn merge_snippets(self, after: Self) -> Self {
        let start_line = self.start_line;
        let end_line = after.end_line;
        dbg!(
            "merge_snippets",
            self.start_line,
            self.end_line,
            after.start_line,
            after.end_line
        );
        let current_snippet_lines = self
            .snippet_lines
            .iter()
            .enumerate()
            .map(|(idx, line)| {
                let line_number = idx + self.start_line;
                (line_number, line.to_owned())
            })
            .collect::<Vec<_>>();
        let other_snippet_lines = after
            .snippet_lines
            .iter()
            .enumerate()
            .map(|(idx, line)| {
                let line_number = idx + after.start_line;
                (line_number, line.to_owned())
            })
            .collect::<Vec<_>>();
        let mut line_map: HashMap<usize, String> = Default::default();
        current_snippet_lines
            .into_iter()
            .for_each(|(line_number, content)| {
                line_map.insert(line_number, content);
            });
        other_snippet_lines
            .into_iter()
            .for_each(|(line_number, content)| {
                line_map.insert(line_number, content);
            });
        let mut new_content = vec![];
        for index in start_line..end_line + 1 {
            new_content.push(
                line_map
                    .remove(&index)
                    .expect("line number to be always present")
                    .clone(),
            );
        }
        Self {
            snippet_lines: new_content,
            start_line,
            end_line,
        }
    }

    /// We want to make sure that the snippets which should be together are merged
    pub fn coelace_snippets(snippets: Vec<SnippetInformation>) -> Vec<SnippetInformation> {
        let mut snippets = snippets;
        snippets.sort_by(|a, b| a.start_line.cmp(&b.start_line));
        if snippets.is_empty() {
            vec![]
        } else {
            let mut merged_snippets = vec![];
            let mut current_snippet = snippets[0].clone();
            for i in 1..snippets.len() {
                let next_snippet = snippets[i].clone();
                if current_snippet.end_line >= next_snippet.start_line {
                    // we can merge these 2 snippets together
                    current_snippet = current_snippet.merge_snippets(next_snippet);
                } else {
                    merged_snippets.push(current_snippet);
                    current_snippet = snippets[i].clone();
                }
            }
            merged_snippets.push(current_snippet);
            merged_snippets
        }
    }
}

/// This contains the bag of words for the given snippets and it uses a custom
/// tokenizer to extract the words from the code
#[derive(Debug)]
pub struct BagOfWords {
    words: HashSet<String>,
    snippet: SnippetInformation,
}

impl BagOfWords {
    pub fn new(
        snippet_lines: Vec<String>,
        start_line: usize,
        end_line: usize,
        words: HashSet<String>,
    ) -> Self {
        BagOfWords {
            words,
            snippet: SnippetInformation::new(snippet_lines, start_line, end_line),
        }
    }

    fn jaccard_score(&self, other: &Self) -> f32 {
        let intersection_size = self.words.intersection(&other.words).count();
        let union_size = self.words.len() + other.words.len() - intersection_size;
        intersection_size as f32 / union_size as f32
    }
}

/// Keeps track of the lines which have been added and edited into the code
/// Note: This does not keep track of the lines which have been removed
#[derive(Clone, Debug)]
pub enum DocumentLineStatus {
    Edited,
    Unedited,
}

pub struct DocumentLine {
    line_status: DocumentLineStatus,
    content: String,
}

impl DocumentLine {
    pub fn line_status(&self) -> DocumentLineStatus {
        self.line_status.clone()
    }

    pub fn is_edited(&self) -> bool {
        matches!(self.line_status, DocumentLineStatus::Edited)
    }

    pub fn is_unedited(&self) -> bool {
        matches!(self.line_status, DocumentLineStatus::Unedited)
    }
}

pub struct DocumentEditLines {
    lines: Vec<DocumentLine>,
    file_path: String,
    language: String,
    // What snippets are in the document
    // Some things we should take care of:
    // when providing context to the inline autocomplete we want to make sure that
    // the private methods are not shown (cause they are not necessary)
    // when showing snippets for jaccard similarity, things are difference
    // we want to show the content for it no matter what
    // basically if its because of a symbol then we should only show the outline here
    // but if that's not the case, then its fine
    window_snippets: Vec<BagOfWords>,
    editor_parsing: Arc<EditorParsing>,
    tree: Option<Tree>,
}

impl DocumentEditLines {
    pub fn new(
        file_path: String,
        content: String,
        language: String,
        editor_parsing: Arc<EditorParsing>,
    ) -> DocumentEditLines {
        let mut document_lines = if content == "" {
            DocumentEditLines {
                lines: vec![DocumentLine {
                    line_status: DocumentLineStatus::Unedited,
                    content: "".to_string(),
                }],
                file_path,
                language,
                window_snippets: vec![],
                editor_parsing,
                tree: None,
            }
        } else {
            let lines = split_on_lines_editor_compatiable(&content)
                .into_iter()
                .map(|line_content| DocumentLine {
                    line_status: DocumentLineStatus::Unedited,
                    content: line_content.to_string(),
                })
                .collect::<Vec<_>>();
            DocumentEditLines {
                lines,
                file_path,
                language,
                window_snippets: vec![],
                editor_parsing,
                tree: None,
            }
        };
        // This is a very expensive operation for now, we are going to optimize the shit out of this 🍶
        document_lines.generate_snippets();
        document_lines
    }

    fn set_tree(&mut self) {
        if let Some(language_config) = self.editor_parsing.for_file_path(&self.file_path) {
            let tree = language_config.get_tree_sitter_tree(self.get_content().as_bytes());
            self.tree = tree;
        }
    }

    pub fn get_content(&self) -> String {
        self.lines
            .iter()
            .map(|line| line.content.clone())
            .collect::<Vec<_>>()
            .join("\n")
    }

    fn remove_range(&mut self, range: Range) {
        let start_line = range.start_line();
        let start_column = range.start_column();
        let end_line = range.end_line();
        let end_column = range.end_column();
        // Why are we putting a -1 here, well there is a reason for it
        // when vscode provides us the range to replace, it gives us the end
        // column as the last character of the selection + 1, for example
        // if we have the content as: "abcde"
        // and we want to replace "de" in "abcde", we get back
        // the range as:
        // start_line: 0, start_column: 3, end_line: 0, end_column: 5 (note this is + 1 the final position)
        // so we subtract it with -1 here to keep things sane
        // a catch here is that the end_column can also be 0 if we are removing empty lines
        // so we guard and then subtract
        if start_line == end_line {
            if start_column == end_column {
                return;
            } else {
                let end_column = if range.end_column() != 0 {
                    range.end_column() - 1
                } else {
                    range.end_column()
                };
                // we get the line at this line number and remove the content between the start and end columns
                let line = self.lines.get_mut(start_line).unwrap();
                let start_index = start_column;
                let end_index = end_column;
                let mut characters = line.content.chars().collect::<Vec<_>>();
                let start_index = start_index as usize;
                let end_index = end_index as usize;
                characters.drain(start_index..end_index + 1);
                line.content = characters.into_iter().collect();
            }
        } else {
            // This is a more complicated case
            // we handle it by the following ways:
            // - handle the start line and keep the prefix required
            // - handle the end line and keep the suffix as required
            // - remove the lines in between
            // - merge the prefix and suffix of the start and end lines

            // get the start of line prefix
            let start_line_characters = self.lines[start_line].content.chars().collect::<Vec<_>>();
            let start_line_prefix = start_line_characters[..start_column as usize].to_owned();
            // get the end of line suffix
            let end_column = range.end_column();
            let end_line_characters = self.lines[end_line].content.chars().collect::<Vec<_>>();
            let end_line_suffix = end_line_characters[end_column..].to_owned();
            {
                let start_doc_line = self.lines.get_mut(start_line).unwrap();
                start_doc_line.content = start_line_prefix.into_iter().collect::<String>()
                    + &end_line_suffix.into_iter().collect::<String>();
            }
            // remove the lines in between the start line and the end line
            self.lines.drain(start_line + 1..end_line + 1);
            // remove the lines in between the start line and the end line
        }
    }

    fn insert_at_position(&mut self, position: Position, content: String) {
        // If this is strictly a removal, then we do not need to insert anything
        if content == "" {
            return;
        }
        // when we want to insert at the position so first we try to start appending it at the line number from the current column
        // position and also add the suffix which we have, this way we get the new lines which need to be inserted
        let line_content = self.lines[position.line()].content.to_owned();
        let characters = line_content.chars().into_iter().collect::<Vec<_>>();
        println!("characters: {:?}", characters);
        println!("position: {:?}", &position);
        // get the prefix right before the column position
        let prefix = characters[..position.column() as usize]
            .to_owned()
            .into_iter()
            .collect::<String>();
        // get the suffix right after the column position
        let suffix = characters[position.column() as usize..]
            .to_owned()
            .into_iter()
            .collect::<String>();
        // the new content here is the prefix + content + suffix
        let new_content = format!("{}{}{}", prefix.to_owned(), content, suffix);
        // now we get the new lines which need to be inserted
        let new_lines = split_on_lines_editor_compatiable(&new_content)
            .into_iter()
            .map(|line| DocumentLine {
                line_status: DocumentLineStatus::Edited,
                content: line.to_owned(),
            });
        // we also need to remove the line at the current line number
        self.lines.remove(position.line());
        // now we add back the lines which need to be inserted
        self.lines
            .splice(position.line()..position.line(), new_lines);
    }

    fn snippets_using_sliding_window(&mut self, lines: Vec<String>) {
        // useful links: https://github.com/thakkarparth007/copilot-explorer/blob/4a572ef4653811e789a05b370d3da49a784d6172/codeviz/data/module_codes_renamed/1016.js#L21-L25
        // https://github.com/thakkarparth007/copilot-explorer/blob/4a572ef4653811e789a05b370d3da49a784d6172/codeviz/data/module_codes_renamed/1016.js#L61-L87
        // Maximum snippet size here is 50 lines and we want to generate the snippets using the lines
        let mut final_snippets = vec![];

        // we are going to change the algorithm to be the following:
        // - iterate over each line and split them using the regex which we have above
        // - create a running hashmap of the words and their frequency occurance
        // - for each window iterate over the entries in the hashmap and create the hashset of the words
        // - profit?

        let mut line_map: HashMap<usize, Vec<String>> = Default::default();
        for (idx, line) in lines.iter().enumerate() {
            line_map.insert(idx, split_into_words(line));
        }

        let mut running_word_count: HashMap<String, usize> = Default::default();

        for index in 0..std::cmp::min(lines.len(), 50) {
            let bag_of_words = line_map.get(&index);
            if let Some(bag_of_words) = bag_of_words {
                bag_of_words.iter().for_each(|word| {
                    if !running_word_count.contains_key(word) {
                        running_word_count.insert(word.to_owned(), 1);
                    } else {
                        running_word_count.insert(
                            word.to_owned(),
                            running_word_count
                                .get(word)
                                .expect("if !contains_key to work")
                                + 1,
                        );
                    }
                });
            }
        }

        // using +1 notation here so we do not run into subtraction errors when using usize
        if lines.len() <= 50 {
            let line_length = lines.len();
            final_snippets.push(BagOfWords::new(
                lines,
                1,
                line_length,
                running_word_count
                    .into_iter()
                    .filter_map(|(key, value)| {
                        if value > 0 {
                            Some(key.to_owned())
                        } else {
                            None
                        }
                    })
                    .collect(),
            ));
        } else {
            for index in 1..(lines.len() - 50) {
                // first line is: 0 - 49
                // second line is: 1 - 50 (for this we need to remove 0th line and add the 50th line)
                // we need to remove the entries of the previous line from the running hashmap
                // and then we need to add the entries from the index + 50th line
                let removing_line = index - 1;
                let adding_line = index + (50 - 1);
                let removing_line_bag = line_map.get(&removing_line);
                let added_line_bag = line_map.get(&adding_line);
                if let Some(removing_line_bag) = removing_line_bag {
                    removing_line_bag.iter().for_each(|word| {
                        // how is this showing up??
                        let value = running_word_count.get(word).expect("to be present");
                        running_word_count.insert(word.to_owned(), value - 1);
                    });
                }
                if let Some(added_line_bag) = added_line_bag {
                    added_line_bag.iter().for_each(|word| {
                        if !running_word_count.contains_key(word) {
                            running_word_count.insert(word.to_owned(), 1);
                        } else {
                            running_word_count.insert(
                                word.to_owned(),
                                running_word_count
                                    .get(word)
                                    .expect("if !contains_key to work")
                                    + 1,
                            );
                        }
                    });
                }
                let current_lines = lines[index..index + 50].to_vec();
                final_snippets.push(BagOfWords::new(
                    current_lines,
                    index + 1,
                    index + 1 + 49, // index + 1 + (50 - 1) since we are adding 50 lines
                    running_word_count
                        .iter()
                        .filter_map(|(key, value)| {
                            if value > &0 {
                                Some(key.to_owned())
                            } else {
                                None
                            }
                        })
                        .collect(),
                ));
            }
        }
        self.window_snippets = final_snippets;
    }

    fn generate_snippets(&mut self) {
        // generate the new tree sitter tree
        let instant = Instant::now();
        self.set_tree();
        dbg!("Time to generate tree: {:?}", instant.elapsed());

        let content = self.get_content();

        let source_code = content.as_bytes();
        // For generating the snippets we have to use the following tricks which might be useful
        // - we do not want to include imports (they are just noise)
        // - we want to provide the implementations of the functions and classes, these are necessary
        // - can a stupid sliding window here work as we want?
        let language_config = self.editor_parsing.for_file_path(&self.file_path);
        let mut exlcuded_lines_import: HashSet<usize> = Default::default();
        match (language_config, self.tree.as_ref()) {
            (Some(language_config), Some(tree)) => {
                let excluded_ranges = language_config.get_import_ranges(tree, source_code);
                excluded_ranges.into_iter().for_each(|range| {
                    let start_line = range.start_line();
                    let end_line = range.end_line();
                    // Now we grab all the lines between start and end line
                    for i in start_line..end_line + 1 {
                        exlcuded_lines_import.insert(i);
                    }
                });
            }
            _ => {}
        }

        // we check what different types of constructs we have in the tree, and then only exclude the
        // import lines which are not convered by any of the other constructs
        if let (Some(language_config), Some(tree)) = (language_config, self.tree.as_ref()) {
            // remove the lines which are covered by the functions, since these are part of function bodies
            language_config
                .capture_function_data_with_tree(source_code, tree)
                .into_iter()
                .for_each(|function_data| {
                    let range = function_data.range();
                    for line in range.start_line()..range.end_line() + 1 {
                        exlcuded_lines_import.remove(&line);
                    }
                });
        }

        // now we create the new file content after removing the import lines
        let mut filtered_lines = vec![];
        for (i, line) in self.lines.iter().enumerate() {
            if !exlcuded_lines_import.contains(&i) {
                filtered_lines.push(line.content.to_owned());
            }
        }

        // after filtered content we have to grab the sliding window context, we generate the windows
        // we have some interesting things we can do while generating the code context
        let instant = std::time::Instant::now();
        self.snippets_using_sliding_window(filtered_lines);
        dbg!("snippets sliding window: ", instant.elapsed());
    }

    // If the contents have changed, we need to mark the new lines which have changed
    pub fn content_change(&mut self, range: Range, new_content: String) {
        // First we remove the content at the range which is changing
        dbg!("Removing range: {:?}", &self.file_path);
        self.remove_range(range);
        dbg!("content after removing range", &self.get_content());
        dbg!("Insert at position: {:?}", &self.file_path);
        // Then we insert the new content at the range
        self.insert_at_position(range.start_position(), new_content);
        // We want to get the code snippets here and make sure that the edited code snippets
        // are together when creating the window
        // TODO(skcd): Bring this back
        // are we doing someting over here
        dbg!("Generating snippets: {:?}", &self.file_path);
        self.generate_snippets();
    }

    pub fn grab_similar_context(&self, context: &str) -> Vec<SnippetInformationWithScope> {
        // go through all the snippets and see which ones are similar to the context
        let lines = context
            .lines()
            .into_iter()
            .map(|line| line.to_string())
            .collect::<Vec<_>>();
        let bag_of_words_hashset = split_into_hashset(lines.to_vec());
        let bag_of_words = BagOfWords::new(lines, 0, 0, bag_of_words_hashset);
        let mut scored_snippets = self
            .window_snippets
            .iter()
            .filter_map(|snippet| {
                let score = snippet.jaccard_score(&bag_of_words);
                if score > 0.3 {
                    Some((score, snippet))
                } else {
                    None
                }
            })
            .collect::<Vec<_>>();
        // f32 comparison should work
        scored_snippets.sort_by(|a, b| b.0.partial_cmp(&a.0).unwrap());
        // we remove the snippets which are overlapping and are already included at the top
        let mut included_ranges: Vec<(usize, usize)> = vec![];
        let mut final_snippets = scored_snippets
            .into_iter()
            .filter_map(|scored_snippet| {
                let snippet_information = &scored_snippet.1.snippet;
                let start_line = snippet_information.start_line;
                let end_line = snippet_information.end_line;
                // check if any of the included ranges already overlaps with the current snippet
                let intersects_range = included_ranges.iter().any(|range| {
                    if range.0 >= start_line && range.0 <= end_line {
                        return true;
                    }
                    if range.1 >= start_line && range.1 <= end_line {
                        return true;
                    }
                    return false;
                });
                if intersects_range {
                    None
                } else {
                    // push the new range to the included ranges
                    included_ranges.push((start_line, end_line));
                    Some(scored_snippet)
                }
            })
            .collect::<Vec<_>>();
        // we take at the very most 10 snippets from a single file
        // this prevents a single file from giving out too much data
        final_snippets.truncate(10);

        dbg!(final_snippets
            .into_iter()
            .map(|snippet| SnippetInformationWithScope {
                snippet_information: snippet.1.snippet.clone(),
                score: snippet.0,
                file_path: self.file_path.clone(),
            })
            .collect::<Vec<_>>())
    }
}

#[cfg(test)]
mod tests {
    use std::sync::Arc;

    use crate::chunking::{
        editor_parsing::EditorParsing,
        text_document::{Position, Range},
    };

    use super::DocumentEditLines;

    #[test]
    fn test_document_lines_works() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let document = DocumentEditLines::new(
            "".to_owned(),
            r#"


"#
            .to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        assert_eq!(document.lines.len(), 4);
    }

    #[test]
    fn test_remove_range_works_as_expected() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            r#"FIRST LINE
SECOND LINE
THIRD LINE
FOURTH LINE
FIFTH LINE 🫡
SIXTH LINE 🫡🚀"#
                .to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let range = Range::new(Position::new(4, 0, 0), Position::new(5, 0, 0));
        document.remove_range(range);
        let updated_content = document.get_content();
        assert_eq!(
            updated_content,
            r#"FIRST LINE
SECOND LINE
THIRD LINE
FOURTH LINE
SIXTH LINE 🫡🚀"#
        );
    }

    #[test]
    fn test_remove_range_empty_works() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            r#"SOMETHING"#.to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let range = Range::new(Position::new(0, 0, 0), Position::new(0, 0, 0));
        document.remove_range(range);
        let updated_content = document.get_content();
        assert_eq!(updated_content, "SOMETHING");
    }

    #[test]
    fn test_insert_at_position_works_as_expected() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            r#"FIRST LINE
SECOND LINE
THIRD LINE
🫡🫡🫡🫡
FIFTH LINE 🫡
SIXTH LINE 🫡🚀"#
                .to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let position = Position::new(3, 1, 0);
        document.insert_at_position(position, "🚀🚀🚀\n🪨🪨".to_owned());
        let updated_content = document.get_content();
        assert_eq!(
            updated_content,
            r#"FIRST LINE
SECOND LINE
THIRD LINE
🫡🚀🚀🚀
🪨🪨🫡🫡🫡
FIFTH LINE 🫡
SIXTH LINE 🫡🚀"#
        );
    }

    #[test]
    fn test_insert_on_empty_document_works() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document =
            DocumentEditLines::new("".to_owned(), "".to_owned(), "".to_owned(), editor_parsing);
        let position = Position::new(0, 0, 0);
        document.insert_at_position(position, "SOMETHING".to_owned());
        let updated_content = document.get_content();
        assert_eq!(updated_content, "SOMETHING");
    }

    #[test]
    fn test_removing_all_content() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            r#"FIRST LINE
SECOND LINE
THIRD LINE
🫡🫡🫡🫡
FIFTH LINE 🫡
SIXTH LINE 🫡🚀"#
                .to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let range = Range::new(Position::new(0, 0, 0), Position::new(5, 13, 0));
        document.remove_range(range);
        let updated_content = document.get_content();
        assert_eq!(updated_content, "");
    }

    #[test]
    fn test_removing_content_single_line() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            "blah blah\n// bbbbbbbb\nblah blah".to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let range = Range::new(Position::new(1, 3, 0), Position::new(1, 11, 0));
        document.remove_range(range);
        let updated_content = document.get_content();
        assert_eq!(updated_content, "blah blah\n// \nblah blah");
    }

    #[test]
    fn test_insert_content_multiple_lines_blank() {
        let editor_parsing = Arc::new(EditorParsing::default());
        let mut document = DocumentEditLines::new(
            "".to_owned(),
            r#"aa

bb

camelCase

dd

ee






fff"#
                .to_owned(),
            "".to_owned(),
            editor_parsing,
        );
        let range = Range::new(Position::new(9, 0, 0), Position::new(13, 0, 0));
        document.content_change(range, "".to_owned());
        let updated_content = document.get_content();
        let expected_output = r#"aa

bb

camelCase

dd

ee


fff"#;
        assert_eq!(updated_content, expected_output);
    }

    #[test]
    fn test_updating_document_multiline_does_not_break() {
        let original_content = r#"aa

bb

camelCase

dd

ee


fff"#;
        let mut document_lines = DocumentEditLines::new(
            "".to_owned(),
            original_content.to_owned(),
            "".to_owned(),
            Arc::new(EditorParsing::default()),
        );
        let range = Range::new(Position::new(6, 0, 0), Position::new(8, 2, 0));
        document_lines.content_change(range, "expected_output".to_owned());
        let updated_content = document_lines.get_content();
        let expected_output = r#"aa

bb

camelCase

expected_output


fff"#;
        assert_eq!(updated_content, expected_output);
    }
}

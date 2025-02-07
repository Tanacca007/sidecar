use std::io::{BufWriter, Write};
use std::{
    collections::HashMap,
    env,
    fs::{read_dir, read_to_string, File},
    path::Path,
};

#[derive(serde::Deserialize)]
struct Language {
    r#type: String,
    aliases: Option<Vec<String>>,
}

fn main() -> std::io::Result<()> {
    // Copy over the model files to where the binary gets generated at
    // copy_model_files();
    // This will run the migrations scripts for the sqlx
    let important_files_which_trigger_reindexing = [
        "src/chunking/languages.rs",
        "src/agentic/tool/session/session.rs",
        "src/agentic/tool/session/service.rs",
    ];
    let sql_schema_files = ["migrations"];
    let mut hasher = blake3::Hasher::new();
    for path in important_files_which_trigger_reindexing {
        hasher.update(read_to_string(path)?.as_bytes());
        println!("cargo:rerun-if-changed={path}");
    }
    for path in sql_schema_files
        .iter()
        .flat_map(|dir| {
            read_dir(dir).unwrap_or_else(|e| {
                panic!("Failed to read directory {}: {}", dir, e)
            })
        })
        .filter_map(Result::ok)
        .filter_map(|entry| {
            let path = entry.path();
            Some(path)
        })
    {
        hasher.update(read_to_string(&path)?.as_bytes());
        println!("cargo:rerun-if-changed={}", path.to_string_lossy());
    }
    println!("cargo:rerun-if-changed=migrations");
    println!("cargo:rerun-if-changed=src");
    let version_file = Path::new(&env::var("OUT_DIR").map_err(|e| std::io::Error::new(
        std::io::ErrorKind::Other,
        format!("Failed to get OUT_DIR: {}", e)
    ))?).join("version_hash.rs");
    write!(
        File::create(version_file)?,
        r#"pub const BINARY_VERSION_HASH: &str = "{}";"#,
        hasher.finalize()
    )?;

    // Now we load the languages.yml and then create the extension and the case mapping
    let langs_file = File::open("./languages.yml")?;
    let langs: HashMap<String, Language> = serde_yaml::from_reader(langs_file).map_err(|e| std::io::Error::new(
        std::io::ErrorKind::Other,
        format!("Failed to parse languages.yml: {}", e)
    ))?;
    let languages_path = Path::new(&env::var("OUT_DIR").unwrap()).join("languages.rs");
    let mut ext_map = phf_codegen::Map::new();
    let mut case_map = phf_codegen::Map::new();
    for (name, data) in langs
        .into_iter()
        .filter(|(_, d)| d.r#type == "programming" || d.r#type == "prose")
    {
        let name_lower = name.to_ascii_lowercase();

        for alias in data.aliases.unwrap_or_default() {
            ext_map.entry(alias, &format!("\"{name_lower}\""));
        }

        case_map.entry(name_lower, &format!("\"{name}\""));
    }

    write!(
        BufWriter::new(File::create(languages_path)?),
        "pub static EXT_MAP: phf::Map<&str, &str> = \n{};\n\
         pub static PROPER_CASE_MAP: phf::Map<&str, &str> = \n{};\n",
        ext_map.build(),
        case_map.build(),
    )?;

    println!("cargo:rerun-if-changed=./languages.yml");
    
    #[cfg(feature = "grpc")]
    {
        println!("cargo:rerun-if-changed=proto/agent_farm.proto");
        tonic_build::compile_protos("proto/agent_farm.proto").map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to compile protos: {}", e),
            )
        })?;
    }
    Ok(())
}

// fn copy_model_files() {
//     // Where is the out dir located?
//     let current_directory = env::current_dir().unwrap();
//     // Now we want to deep copy over the src/models folder in the current
//     // directory where the build is running and paste it beside the binary
//     // or as a subfolder here
//     let src_models_dir = current_directory.join("src").join("models");
//     let out_dir_env = env::var("OUT_DIR").unwrap();
//     let output_directory = Path::new(&out_dir_env);
//     // We need to make sure this path exists
//     let out_models_dir = output_directory.join("models");
//     fs::create_dir_all(&out_models_dir).unwrap();
//     println!("We are over here at copy_model_files");
//     // Now we want to copy over the src/models folder to the out/models folder
//     // We can use the fs_extra crate to do this
//     fs_extra::dir::copy(
//         src_models_dir,
//         out_models_dir,
//         &fs_extra::dir::CopyOptions::new(),
//     )
//     .unwrap();
// }
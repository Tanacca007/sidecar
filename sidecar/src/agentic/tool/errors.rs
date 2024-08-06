use llm_client::clients::types::{LLMClientError, LLMType};
use thiserror::Error;

use super::{
    code_symbol::types::CodeSymbolError, file::types::FileImportantError,
    filtering::errors::CodeToEditFilteringError, kw_search::types::KeywordsReplyError,
    r#type::ToolType, rerank::base::ReRankError, search::agentic::GenerateSearchPlanError,
};

#[derive(Debug, Error)]
pub enum ToolError {
    #[error("Unable to grab the context")]
    UnableToGrabContext,

    #[error("LLM not supported for tool")]
    LLMNotSupported,

    #[error("Wrong tool input found: {0}")]
    WrongToolInput(ToolType),

    #[error("LLM Client call error: {0}")]
    LLMClientError(LLMClientError),

    #[error("Missing tool")]
    MissingTool,

    #[error("Error converting serde json to string")]
    SerdeConversionFailed,

    #[error("Communication with editor failed")]
    ErrorCommunicatingWithEditor,

    #[error("Language not supported")]
    NotSupportedLanguage,

    #[error("ReRanking error: {0}")]
    ReRankingError(ReRankError),

    #[error("Code Symbol Error: {0}")]
    CodeSymbolError(CodeSymbolError),

    #[error("Symbol not found: {0}")]
    SymbolNotFound(String),

    #[error("Code to edit filtering error: {0}")]
    CodeToEditFiltering(CodeToEditFilteringError),

    #[error("Code not formatted properly: {0}")]
    CodeNotFormatted(String),

    #[error("Invoking SWE Bench test failed")]
    SWEBenchTestEndpointError,

    #[error("Not supported LLM: {0}")]
    NotSupportedLLM(LLMType),

    #[error("Missing xml tags")]
    MissingXMLTags,

    #[error("Retries exhausted")]
    RetriesExhausted,

    #[error("File important error, {0}")]
    FileImportantError(FileImportantError),

    #[error("Big search error: {0}")]
    BigSearchError(String),

    #[error("Keyword search error: {0}")]
    KeywordSearchError(KeywordsReplyError),

    #[error("Search plan error: {0}")]
    SearchPlanError(GenerateSearchPlanError),
}

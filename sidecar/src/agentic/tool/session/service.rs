//! Creates the service which handles saving the session and extending it

use std::sync::Arc;

use tokio::io::AsyncWriteExt;

use crate::{
    agentic::{
        symbol::{
            errors::SymbolError, events::message_event::SymbolEventMessageProperties,
            manager::SymbolManager, scratch_pad::ScratchPadAgent, tool_box::ToolBox,
        },
        tool::plan::service::PlanService,
    },
    chunking::text_document::Range,
    repo::types::RepoRef,
    user_context::types::UserContext,
};

use super::session::{AideAgentMode, Session};

/// The session service which takes care of creating the session and manages the storage
pub struct SessionService {
    tool_box: Arc<ToolBox>,
    _symbol_manager: Arc<SymbolManager>,
}

impl SessionService {
    pub fn new(tool_box: Arc<ToolBox>, symbol_manager: Arc<SymbolManager>) -> Self {
        Self {
            tool_box,
            _symbol_manager: symbol_manager,
        }
    }

    fn create_new_session(
        &self,
        session_id: String,
        project_labels: Vec<String>,
        repo_ref: RepoRef,
        storage_path: String,
    ) -> Session {
        Session::new(session_id, project_labels, repo_ref, storage_path)
    }

    pub async fn human_message(
        &self,
        session_id: String,
        storage_path: String,
        exchange_id: String,
        human_message: String,
        user_context: UserContext,
        project_labels: Vec<String>,
        repo_ref: RepoRef,
        agent_mode: AideAgentMode,
        message_properties: SymbolEventMessageProperties,
    ) -> Result<(), SymbolError> {
        println!("session_service::human_message::start");
        let mut session = if let Ok(session) = self.load_from_storage(storage_path.to_owned()).await
        {
            println!(
                "session_service::load_from_storage_ok::session_id({})",
                &session_id
            );
            session
        } else {
            self.create_new_session(
                session_id,
                project_labels.to_vec(),
                repo_ref.clone(),
                storage_path,
            )
        };

        println!("session_service::session_created");

        // add human message
        session = session.human_message(
            exchange_id,
            human_message,
            user_context,
            project_labels,
            repo_ref,
        );

        println!(
            "session_service::reply_to_last_exchange::exchanges({})",
            session.exchanges()
        );

        // now react to the last message
        session = session
            .reply_to_last_exchange(agent_mode, self.tool_box.clone(), message_properties)
            .await?;

        // save the session to the disk
        self.save_to_storage(&session).await?;
        Ok(())
    }

    /// Generates the plan over here and upon invocation we take care of executing
    /// the steps
    pub async fn plan_generation(
        &self,
        _session_id: String,
        _storage_path: String,
        _plan_service: PlanService,
        _exchange_id: String,
        _query: String,
        _user_context: UserContext,
        _project_labels: Vec<String>,
        _repo_ref: RepoRef,
        _root_directory: String,
        _codebase_search: bool,
        mut _message_properties: SymbolEventMessageProperties,
    ) -> Result<(), SymbolError> {
        Ok(())
    }

    pub async fn code_edit_agentic(
        &self,
        session_id: String,
        storage_path: String,
        scratch_pad_agent: ScratchPadAgent,
        exchange_id: String,
        edit_request: String,
        user_context: UserContext,
        project_labels: Vec<String>,
        repo_ref: RepoRef,
        root_directory: String,
        codebase_search: bool,
        mut message_properties: SymbolEventMessageProperties,
    ) -> Result<(), SymbolError> {
        println!("session_service::code_edit::agentic::start");
        let mut session = if let Ok(session) = self.load_from_storage(storage_path.to_owned()).await
        {
            println!(
                "session_service::load_from_storage_ok::session_id({})",
                &session_id
            );
            session
        } else {
            self.create_new_session(
                session_id.to_owned(),
                project_labels.to_vec(),
                repo_ref.clone(),
                storage_path,
            )
        };

        // add an exchange that we are going to perform anchored edits
        session = session.agentic_edit(exchange_id, edit_request, user_context, codebase_search);

        let edit_exchange_id = self
            .tool_box
            .create_new_exchange(session_id, message_properties.clone())
            .await?;

        message_properties = message_properties.set_request_id(edit_exchange_id);

        session
            .perform_agentic_editing(scratch_pad_agent, root_directory, message_properties)
            .await?;
        println!("session_service::code_edit::agentic::stop");
        Ok(())
    }

    /// We are going to try and do code edit since we are donig anchored edit
    pub async fn code_edit_anchored(
        &self,
        session_id: String,
        storage_path: String,
        scratch_pad_agent: ScratchPadAgent,
        exchange_id: String,
        edit_request: String,
        user_context: UserContext,
        project_labels: Vec<String>,
        repo_ref: RepoRef,
        mut message_properties: SymbolEventMessageProperties,
    ) -> Result<(), SymbolError> {
        println!("session_service::code_edit::anchored::start");
        let mut session = if let Ok(session) = self.load_from_storage(storage_path.to_owned()).await
        {
            println!(
                "session_service::load_from_storage_ok::session_id({})",
                &session_id
            );
            session
        } else {
            self.create_new_session(
                session_id.to_owned(),
                project_labels.to_vec(),
                repo_ref.clone(),
                storage_path,
            )
        };

        let selection_variable = user_context.variables.iter().find(|variable| {
            variable.is_selection()
                && !(variable.start_position.line() == 0 && variable.end_position.line() == 0)
        });
        if selection_variable.is_none() {
            return Ok(());
        }
        let selection_variable = selection_variable.expect("is_none to hold above");
        let selection_range = Range::new(
            selection_variable.start_position,
            selection_variable.end_position,
        );
        let selection_fs_file_path = selection_variable.fs_file_path.to_owned();
        let file_content = self
            .tool_box
            .file_open(
                selection_fs_file_path.to_owned(),
                message_properties.clone(),
            )
            .await?;
        let file_content_in_range = file_content
            .content_in_range(&selection_range)
            .unwrap_or(selection_variable.content.to_owned());

        let edit_exchange_id = self
            .tool_box
            .create_new_exchange(session_id, message_properties.clone())
            .await?;

        message_properties = message_properties.set_request_id(edit_exchange_id);

        // add an exchange that we are going to perform anchored edits
        session = session.anchored_edit(
            exchange_id,
            edit_request,
            user_context,
            selection_range,
            selection_fs_file_path,
            file_content_in_range,
        );

        // Now we can start editing the selection over here
        session
            .perform_anchored_edit(scratch_pad_agent, message_properties)
            .await?;
        println!("session_service::code_edit::anchored_edit::finished");
        Ok(())
    }

    async fn load_from_storage(&self, storage_path: String) -> Result<Session, SymbolError> {
        let content = tokio::fs::read_to_string(storage_path)
            .await
            .map_err(|e| SymbolError::IOError(e))?;

        let session: Session =
            serde_json::from_str(&content).expect("converting to session from json is okay");
        Ok(session)
    }

    async fn save_to_storage(&self, session: &Session) -> Result<(), SymbolError> {
        let serialized = serde_json::to_string(session).unwrap();
        let mut file = tokio::fs::File::create(session.storage_path())
            .await
            .map_err(|e| SymbolError::IOError(e))?;
        file.write_all(serialized.as_bytes())
            .await
            .map_err(|e| SymbolError::IOError(e))?;
        Ok(())
    }
}

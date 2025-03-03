#[cfg(test)]
mod tests {
    use super::*;
    use crate::inline_completion::types::*;
    use std::sync::Arc;

    #[test]
    fn test_anthropic_immediate_termination() {
        let context = Arc::new(FillInMiddleStreamContext {
            next_non_empty_line: Some("next line".to_string()),
            ..Default::default()
        });
        
        let result = immediate_terminating_condition(
            "some text".to_string(),
            Some("</code_inserted>".to_string()),
            &Range::default(),
            context.clone(),
            LLMType::Claude2,
        );
        
        assert_eq!(result, TerminationCondition::Immediate);
    }

    #[test]
    fn test_non_anthropic_no_immediate_termination() {
        let context = Arc::new(FillInMiddleStreamContext {
            next_non_empty_line: Some("next line".to_string()),
            ..Default::default()
        });
        
        let result = immediate_terminating_condition(
            "some text".to_string(),
            Some("</code_inserted>".to_string()),
            &Range::default(),
            context.clone(),
            LLMType::GPT4,
        );
        
        assert_ne!(result, TerminationCondition::Immediate);
    }

    #[test]
    fn test_anthropic_without_code_inserted_tag() {
        let context = Arc::new(FillInMiddleStreamContext {
            next_non_empty_line: Some("next line".to_string()),
            ..Default::default()
        });
        
        let result = immediate_terminating_condition(
            "some text".to_string(),
            Some("regular text".to_string()),
            &Range::default(),
            context.clone(),
            LLMType::Claude2,
        );
        
        assert_ne!(result, TerminationCondition::Immediate);
    }

    #[test]
    fn test_empty_delta() {
        let context = Arc::new(FillInMiddleStreamContext {
            next_non_empty_line: Some("next line".to_string()),
            ..Default::default()
        });
        
        let result = immediate_terminating_condition(
            "some text".to_string(),
            None,
            &Range::default(),
            context.clone(),
            LLMType::Claude2,
        );
        
        assert_ne!(result, TerminationCondition::Immediate);
    }
}

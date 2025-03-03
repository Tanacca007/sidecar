const OptimizationSuggestions = ({ metrics }) => {
  const suggestions = analyzeSuggestions(metrics);

  return (
    <div className="optimization-suggestions mt-6">
      <h4 className="font-medium mb-4">Optimization Suggestions</h4>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            suggestion={suggestion}
            impact={suggestion.impact}
            complexity={suggestion.complexity}
          />
        ))}
      </div>
    </div>
  );
};

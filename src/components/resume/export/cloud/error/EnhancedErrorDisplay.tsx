const EnhancedErrorDisplay = ({ error, onDismiss, onRetry }) => {
  const [expanded, setExpanded] = useState(false);
  const [errorHistory, setErrorHistory] = useState([]);

  useEffect(() => {
    if (error) {
      setErrorHistory(prev => [...prev, error]);
    }
  }, [error]);

  return (
    <div className="enhanced-error-display">
      <ErrorDisplay 
        error={error}
        onDismiss={onDismiss}
        onRetry={onRetry}
      />
      
      <ErrorDetails
        error={error}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />
      
      <ErrorTimeline
        history={errorHistory}
        onSelect={(selectedError) => console.log('Selected error:', selectedError)}
      />
      
      <ErrorMetrics
        errors={errorHistory}
        onAnalyze={(metrics) => console.log('Error metrics:', metrics)}
      />
    </div>
  );
};

export { ErrorTracking, EnhancedErrorDisplay };

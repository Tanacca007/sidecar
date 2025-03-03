const CompressionControl = ({ options, onChange }) => {
  return (
    <div className="control-group mb-6">
      <h4 className="font-semibold mb-3">Compression Settings</h4>
      <div className="grid grid-cols-3 gap-4">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className="p-3 border rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="block font-medium">{option}</span>
            <span className="text-sm text-gray-600">
              {getCompressionDetails(option)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AnalysisFeatures = () => {
  return (
    <div className="analysis-features space-y-6">
      <PerformanceMetrics />
      <AssetAnalysis />
      <OptimizationInsights />
      <RealtimeMonitoring />
    </div>
  );
};

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    size: 0,
    score: 0
  });

  useEffect(() => {
    analyzePerformance().then(setMetrics);
  }, []);

  return (
    <div className="metrics-panel p-4 bg-white rounded-lg shadow">
      <h4 className="font-semibold mb-4">Performance Metrics</h4>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          label="Load Time"
          value={`${metrics.loadTime}ms`}
          trend="decreasing"
        />
        <MetricCard
          label="Total Size"
          value={formatBytes(metrics.size)}
          trend="decreasing"
        />
        <MetricCard
          label="Score"
          value={`${metrics.score}/100`}
          trend="increasing"
        />
      </div>
    </div>
  );
};

const OptimizationInsights = () => {
  return (
    <div className="insights-panel p-4 bg-white rounded-lg shadow">
      <h4 className="font-semibold mb-4">Optimization Insights</h4>
      <div className="space-y-4">
        <InsightCard
          title="Image Optimization"
          description="Potential savings of up to 60%"
          action="Optimize Now"
        />
        <InsightCard
          title="Code Minification"
          description="Reduce file size by 40%"
          action="Apply"
        />
        <InsightCard
          title="Asset Delivery"
          description="Implement CDN for faster delivery"
          action="Configure"
        />
      </div>
    </div>
  );
};

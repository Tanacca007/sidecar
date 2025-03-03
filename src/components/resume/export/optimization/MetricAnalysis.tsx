const MetricAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState({
    performance: {},
    assets: {},
    optimization: {}
  });

  return (
    <div className="metric-analysis grid grid-cols-2 gap-6">
      <PerformanceAnalysis />
      <AssetAnalysis />
      <OptimizationAnalysis />
      <DetailedMetrics />
    </div>
  );
};

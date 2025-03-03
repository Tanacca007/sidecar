import { useState, useEffect } from 'react';

const PerformanceAnalyzer = ({ isAnalyzing, onAnalyze, onComplete }) => {
  const [metrics, setMetrics] = useState({
    fileSize: 0,
    imageCount: 0,
    fontCount: 0,
    compressionRatio: 0,
    loadTime: 0
  });

  const analyzePerformance = async () => {
    onAnalyze();
    
    const results = {
      images: await analyzeImages(),
      fonts: await analyzeFonts(),
      assets: await analyzeAssets(),
      overall: calculateOverallScore()
    };

    setMetrics(results);
    onComplete(results);
  };

  return (
    <div className="performance-analyzer">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Performance Analysis</h4>
        <button
          onClick={analyzePerformance}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="File Size"
          value={formatFileSize(metrics.fileSize)}
          icon="file-size"
        />
        <MetricCard
          title="Compression"
          value={`${metrics.compressionRatio}%`}
          icon="compress"
        />
        <MetricCard
          title="Load Time"
          value={`${metrics.loadTime}ms`}
          icon="clock"
        />
        <MetricCard
          title="Asset Count"
          value={metrics.imageCount + metrics.fontCount}
          icon="assets"
        />
      </div>

      <OptimizationSuggestions metrics={metrics} />
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-2">
      <i className={`icon-${icon} text-blue-600`} />
      <span className="font-medium">{title}</span>
    </div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

export default PerformanceAnalyzer;

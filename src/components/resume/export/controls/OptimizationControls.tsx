const OptimizationControls = ({ options, onChange }) => {
  const qualityLevels = ['low', 'medium', 'high', 'ultra'];

  return (
    <div className="optimization-controls p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Export Optimization</h3>
      
      <div className="space-y-4">
        <div className="form-control">
          <label className="font-medium">Quality Level</label>
          <select
            value={options.quality}
            onChange={(e) => onChange('quality', e.target.value)}
            className="w-full p-2 border rounded mt-2"
          >
            {qualityLevels.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium">Enable Compression</label>
          <input
            type="checkbox"
            checked={options.compression}
            onChange={(e) => onChange('compression', e.target.checked)}
            className="toggle"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium">Optimize Images</label>
          <input
            type="checkbox"
            checked={options.imageOptimization}
            onChange={(e) => onChange('imageOptimization', e.target.checked)}
            className="toggle"
          />
        </div>

        <div className="optimization-preview mt-4">
          <h4 className="font-medium mb-2">Estimated Output Size</h4>
          <div className="text-sm text-gray-600">
            {calculateEstimatedSize(options)}
          </div>
        </div>
      </div>
    </div>
  );
};

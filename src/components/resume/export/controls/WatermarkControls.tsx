const WatermarkControls = ({ options, onChange }) => {
  const positions = [
    'top-left', 'top-center', 'top-right',
    'center-left', 'center', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  return (
    <div className="watermark-controls p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Watermark Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">Enable Watermark</label>
          <input
            type="checkbox"
            checked={options.enabled}
            onChange={(e) => onChange('enabled', e.target.checked)}
            className="toggle"
          />
        </div>

        {options.enabled && (
          <>
            <input
              type="text"
              value={options.text}
              onChange={(e) => onChange('text', e.target.value)}
              placeholder="Watermark Text"
              className="w-full p-2 border rounded"
            />

            <select
              value={options.position}
              onChange={(e) => onChange('position', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos.replace('-', ' ')}</option>
              ))}
            </select>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={options.opacity}
              onChange={(e) => onChange('opacity', parseFloat(e.target.value))}
              className="w-full"
            />
          </>
        )}
      </div>
    </div>
  );
};

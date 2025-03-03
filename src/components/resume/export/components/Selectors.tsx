const FrequencySelector = ({ options, value, onChange }) => {
  return (
    <div className="frequency-selector mb-4">
      <label className="block text-sm font-medium mb-2">Export Frequency</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map(frequency => (
          <button
            key={frequency}
            onClick={() => onChange(frequency)}
            className={`p-2 rounded ${
              value === frequency 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

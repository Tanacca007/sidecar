const RegionSelector = ({ regions, selected, onChange }) => {
  return (
    <div className="region-selector">
      <label className="block text-sm font-medium mb-2">Region</label>
      <select 
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {regions.map(region => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

const RuntimeSelector = ({ runtimes, selected, onChange }) => {
  return (
    <div className="runtime-selector">
      <label className="block text-sm font-medium mb-2">Runtime Environment</label>
      <div className="grid grid-cols-3 gap-2">
        {runtimes.map(runtime => (
          <button
            key={runtime}
            onClick={() => onChange(runtime)}
            className={`p-2 rounded ${
              selected === runtime 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {runtime}
          </button>
        ))}
      </div>
    </div>
  );
};

const TriggerSelector = ({ triggers, selected, onChange }) => {
  return (
    <div className="trigger-selector">
      <label className="block text-sm font-medium mb-2">Function Trigger</label>
      <div className="space-y-2">
        {triggers.map(trigger => (
          <div
            key={trigger}
            className="flex items-center space-x-2"
          >
            <input
              type="radio"
              id={trigger}
              checked={selected === trigger}
              onChange={() => onChange(trigger)}
            />
            <label htmlFor={trigger}>{trigger}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { RegionSelector, RuntimeSelector, TriggerSelector };

const StyleControlPanel = ({ controls, settings, onUpdate }) => {
  return (
    <div className="style-control-panel space-y-6">
      {Object.entries(controls).map(([category, options]) => (
        <div key={category} className="control-category">
          <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
          
          <div className="control-options grid grid-cols-2 gap-4">
            {Object.entries(options).map(([property, values]) => (
              <div key={property} className="control-option">
                <label className="block text-sm font-medium mb-2 capitalize">
                  {property}
                </label>
                
                {Array.isArray(values) ? (
                  <select
                    value={settings[category]?.[property]}
                    onChange={(e) => onUpdate(category, property, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {values.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={settings[category]?.[property]}
                    onChange={(e) => onUpdate(category, property, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyleControlPanel;

const SecurityControls = ({ options, onChange }) => {
  return (
    <div className="security-controls p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Security Options</h3>
      
      <div className="space-y-4">
        <div className="form-control">
          <label className="font-medium">Password Protection</label>
          <input
            type="password"
            value={options.password}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border rounded mt-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium">Allow Printing</label>
          <input
            type="checkbox"
            checked={options.allowPrinting}
            onChange={(e) => onChange('allowPrinting', e.target.checked)}
            className="toggle"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium">Allow Copying</label>
          <input
            type="checkbox"
            checked={options.allowCopying}
            onChange={(e) => onChange('allowCopying', e.target.checked)}
            className="toggle"
          />
        </div>
      </div>
    </div>
  );
};

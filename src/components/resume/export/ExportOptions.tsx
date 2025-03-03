const ExportOptions = ({ format }) => {
  const [options, setOptions] = useState({
    quality: 'high',
    includeLinks: true,
    compress: false,
    watermark: false
  });

  const formatSpecificOptions = {
    pdf: {
      pageSize: ['A4', 'Letter', 'Legal'],
      orientation: ['Portrait', 'Landscape']
    },
    docx: {
      compatibility: ['Office 365', 'Office 2019', 'Office 2016'],
      tracking: ['Enable', 'Disable']
    },
    html: {
      responsive: true,
      darkMode: true,
      analytics: true
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(formatSpecificOptions[format]).map(([key, values]) => (
          <div key={key} className="form-control">
            <label className="block text-sm font-medium mb-2 capitalize">
              {key}
            </label>
            {Array.isArray(values) ? (
              <select 
                className="w-full p-2 border rounded"
                onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
              >
                {values.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            ) : (
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

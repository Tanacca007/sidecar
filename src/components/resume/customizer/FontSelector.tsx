const FontSelector = ({ fonts, onChange }) => {
  const fontOptions = [
    'Inter',
    'Roboto',
    'Poppins',
    'Playfair Display',
    'Montserrat',
    'Open Sans'
  ];

  return (
    <div className="space-y-4">
      {Object.entries(fonts).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="capitalize mb-1">{key} Font</label>
          <select
            value={value}
            onChange={(e) => onChange({
              ...fonts,
              [key]: e.target.value
            })}
            className="border rounded p-2"
          >
            {fontOptions.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FontSelector;

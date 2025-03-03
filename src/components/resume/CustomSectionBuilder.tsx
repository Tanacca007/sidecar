const CustomSectionBuilder = ({ onAdd }) => {
  const [sectionType, setSectionType] = useState('custom');
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { type: 'text', label: '', required: false }]);
  };

  return (
    <div className="section-builder p-4 border rounded">
      <div className="flex justify-between mb-4">
        <select 
          value={sectionType}
          onChange={(e) => setSectionType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="custom">Custom Section</option>
          <option value="timeline">Timeline</option>
          <option value="grid">Grid Layout</option>
          <option value="showcase">Portfolio Showcase</option>
        </select>
        <button 
          onClick={addField}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Field
        </button>
      </div>

      <div className="fields-container space-y-4">
        {fields.map((field, index) => (
          <FieldEditor 
            key={index}
            field={field}
            onChange={(updated) => {
              const newFields = [...fields];
              newFields[index] = updated;
              setFields(newFields);
            }}
            onRemove={() => {
              setFields(fields.filter((_, i) => i !== index));
            }}
          />
        ))}
      </div>

      <button
        onClick={() => onAdd({ type: sectionType, fields })}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Create Section
      </button>
    </div>
  );
};

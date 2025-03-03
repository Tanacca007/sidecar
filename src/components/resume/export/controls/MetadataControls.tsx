const MetadataControls = ({ options, onChange }) => {
  return (
    <div className="metadata-controls p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Document Metadata</h3>
      
      <div className="space-y-4">
        <div className="form-control">
          <label className="font-medium">Author Name</label>
          <input
            type="text"
            value={options.author}
            onChange={(e) => onChange('author', e.target.value)}
            placeholder="Enter author name"
            className="w-full p-2 border rounded mt-2"
          />
        </div>

        <div className="form-control">
          <label className="font-medium">Keywords</label>
          <TagInput
            tags={options.keywords}
            onChange={(tags) => onChange('keywords', tags)}
            placeholder="Add keywords"
            className="mt-2"
          />
        </div>

        <div className="form-control">
          <label className="font-medium">Description</label>
          <textarea
            value={options.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Enter document description"
            className="w-full p-2 border rounded mt-2 h-24"
          />
        </div>
      </div>
    </div>
  );
};

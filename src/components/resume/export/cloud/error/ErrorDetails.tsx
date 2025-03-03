const ErrorDetails = ({ error, expanded, onToggle }) => {
  return (
    <div className="error-details mt-4 bg-white rounded-lg border">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <span className="font-medium">Technical Details</span>
        <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="p-4 border-t space-y-4">
          <DetailSection
            title="Error Stack"
            content={error.stack}
            type="code"
          />
          
          <DetailSection
            title="System Info"
            content={error.metadata}
            type="json"
          />
          
          <DetailSection
            title="Request Context"
            content={error.context}
            type="table"
          />
          
          <ErrorActions error={error} />
        </div>
      )}
    </div>
  );
};

const DetailSection = ({ title, content, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'code':
        return (
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
            <code>{content}</code>
          </pre>
        );
      case 'json':
        return (
          <pre className="bg-gray-50 p-4 rounded">
            {JSON.stringify(content, null, 2)}
          </pre>
        );
      case 'table':
        return (
          <table className="min-w-full">
            <tbody>
              {Object.entries(content).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="py-2 font-medium">{key}</td>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <p>{content}</p>;
    }
  };

  return (
    <div className="detail-section">
      <h4 className="font-medium mb-2">{title}</h4>
      {renderContent()}
    </div>
  );
};

export { ErrorDetails, DetailSection };

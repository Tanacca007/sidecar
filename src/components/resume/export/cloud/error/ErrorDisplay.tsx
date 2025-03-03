const ErrorDisplay = ({ error, onDismiss, onRetry }) => {
  return (
    <div className="error-display p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-red-700">
          {error.type}
        </h3>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>

      <p className="text-red-600 mb-4">{error.message}</p>

      <div className="suggestions space-y-2 mb-4">
        <h4 className="font-medium text-red-700">Suggested Actions:</h4>
        <ul className="list-disc list-inside text-red-600">
          {error.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry Configuration
        </button>
      </div>
    </div>
  );
};

export { ErrorDisplay };

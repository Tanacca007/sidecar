const DiagnosticFeatures = {
  SystemState: ({ state }) => (
    <div className="system-state grid grid-cols-2 gap-4">
      {Object.entries(state).map(([key, value]) => (
        <div key={key} className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-600">{key}</div>
          <div className="font-medium">{value}</div>
        </div>
      ))}
    </div>
  ),

  EnvironmentInfo: ({ env }) => (
    <div className="environment-info space-y-2">
      <div className="font-medium">Environment Variables</div>
      <div className="bg-gray-50 p-3 rounded">
        <pre className="text-sm">
          {JSON.stringify(env, null, 2)}
        </pre>
      </div>
    </div>
  ),

  Dependencies: ({ deps }) => (
    <div className="dependencies">
      <div className="font-medium mb-2">Dependencies</div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th>Package</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((dep, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{dep.name}</td>
              <td>{dep.version}</td>
              <td>
                <span className={`px-2 py-1 rounded text-sm ${
                  dep.status === 'up-to-date' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {dep.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export { SecurityComponents, DiagnosticFeatures };

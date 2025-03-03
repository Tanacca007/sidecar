const SecurityComponents = {
  SecurityLevel: ({ level }) => {
    const levelColors = {
      critical: 'bg-red-600',
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };

    return (
      <div className="security-level flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${levelColors[level]}`}></span>
        <span className="font-medium capitalize">{level} Severity</span>
      </div>
    );
  },

  VulnerabilityDetails: ({ details }) => (
    <div className="vulnerability-details space-y-2">
      {details.map((vuln, index) => (
        <div key={index} className="p-3 bg-white rounded border border-red-200">
          <div className="font-medium text-red-700">{vuln.title}</div>
          <div className="text-sm text-red-600">{vuln.description}</div>
          <div className="mt-2 text-sm">
            <span className="font-medium">CVE:</span> {vuln.cve}
          </div>
        </div>
      ))}
    </div>
  )
};

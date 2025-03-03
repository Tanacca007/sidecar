const AdditionalSections = {
  SecuritySection: ({ content }) => (
    <div className="security-section bg-red-50 p-4 rounded-lg">
      <h4 className="font-semibold text-red-700 mb-2">Security Impact</h4>
      <div className="space-y-2">
        <SecurityLevel level={content.severity} />
        <VulnerabilityDetails details={content.vulnerabilities} />
        <RemediationSteps steps={content.remediation} />
      </div>
    </div>
  ),

  PerformanceSection: ({ content }) => (
    <div className="performance-section bg-yellow-50 p-4 rounded-lg">
      <h4 className="font-semibold text-yellow-700 mb-2">Performance Metrics</h4>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard metric="Response Time" value={content.responseTime} unit="ms" />
        <MetricCard metric="Memory Usage" value={content.memoryUsage} unit="MB" />
        <MetricCard metric="CPU Load" value={content.cpuLoad} unit="%" />
        <MetricCard metric="Network I/O" value={content.networkIO} unit="KB/s" />
      </div>
    </div>
  ),

  DiagnosticSection: ({ content }) => (
    <div className="diagnostic-section bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold text-blue-700 mb-2">Diagnostic Information</h4>
      <div className="space-y-4">
        <SystemState state={content.systemState} />
        <EnvironmentInfo env={content.environment} />
        <Dependencies deps={content.dependencies} />
      </div>
    </div>
  )
};

export { IntegrationHandlers, AdditionalSections };

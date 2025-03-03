const EnhancedDetailSections = {
  NetworkSection: ({ error }) => (
    <DetailSection
      title="Network Information"
      content={{
        status: error.status,
        endpoint: error.endpoint,
        latency: `${error.latency}ms`,
        headers: error.headers,
        payload: error.payload
      }}
      type="expandable"
    />
  ),

  TimelineSection: ({ error }) => (
    <DetailSection
      title="Error Timeline"
      content={{
        occurred: error.timestamp,
        detected: error.detectedAt,
        reported: error.reportedAt,
        duration: `${error.duration}ms`
      }}
      type="timeline"
    />
  ),

  ResourceSection: ({ error }) => (
    <DetailSection
      title="Resource Usage"
      content={{
        memory: error.memoryUsage,
        cpu: error.cpuUsage,
        connections: error.connections,
        bandwidth: error.bandwidth
      }}
      type="metrics"
    />
  ),

  RelatedIssuesSection: ({ error }) => (
    <DetailSection
      title="Related Issues"
      content={error.relatedIssues.map(issue => ({
        id: issue.id,
        type: issue.type,
        frequency: issue.frequency,
        lastOccurred: issue.timestamp
      }))}
      type="list"
    />
  )
};

export { EnhancedDetailSections };

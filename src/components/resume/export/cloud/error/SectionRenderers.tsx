const SectionRenderers = {
  expandable: ({ content }) => (
    <div className="expandable-content space-y-2">
      {Object.entries(content).map(([key, value]) => (
        <details key={key} className="bg-gray-50 rounded p-2">
          <summary className="font-medium cursor-pointer">{key}</summary>
          <div className="mt-2 pl-4">
            {typeof value === 'object' 
              ? <pre>{JSON.stringify(value, null, 2)}</pre>
              : <span>{value}</span>
            }
          </div>
        </details>
      ))}
    </div>
  ),

  timeline: ({ content }) => (
    <div className="timeline-content space-y-4">
      {Object.entries(content).map(([stage, time]) => (
        <div key={stage} className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1">
            <span className="font-medium">{stage}</span>
            <span className="ml-2 text-gray-600">{time}</span>
          </div>
        </div>
      ))}
    </div>
  ),

  metrics: ({ content }) => (
    <div className="metrics-content grid grid-cols-2 gap-4">
      {Object.entries(content).map(([metric, value]) => (
        <div key={metric} className="bg-gray-50 p-4 rounded">
          <div className="text-sm text-gray-600">{metric}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
      ))}
    </div>
  ),

  list: ({ content }) => (
    <div className="list-content divide-y">
      {content.map((item) => (
        <div key={item.id} className="py-3">
          <div className="flex justify-between">
            <span className="font-medium">{item.type}</span>
            <span className="text-gray-600">#{item.id}</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Occurred {item.frequency} times
          </div>
          <div className="text-sm text-gray-600">
            Last seen: {item.lastOccurred}
          </div>
        </div>
      ))}
    </div>
  )
};

export { SectionRenderers };

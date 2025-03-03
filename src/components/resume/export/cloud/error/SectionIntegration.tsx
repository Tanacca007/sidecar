const SectionIntegration = ({ type, content }) => {
  const renderSection = () => {
    const renderer = SectionRenderers[type];
    if (!renderer) {
      return <DefaultRenderer content={content} />;
    }
    return renderer({ content });
  };

  return (
    <div className="section-integration">
      {renderSection()}
    </div>
  );
};

const DefaultRenderer = ({ content }) => (
  <div className="default-content p-4 bg-gray-50 rounded">
    <pre className="whitespace-pre-wrap">
      {typeof content === 'object' 
        ? JSON.stringify(content, null, 2)
        : content
      }
    </pre>
  </div>
);

export { SectionIntegration };

const RealTimePreview = ({ content, style, settings }) => {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('desktop');

  return (
    <div className="preview-container">
      <div className="preview-controls flex space-x-4 mb-4">
        <div className="zoom-controls">
          <button onClick={() => setZoom(zoom - 10)}>-</button>
          <span>{zoom}%</span>
          <button onClick={() => setZoom(zoom + 10)}>+</button>
        </div>
        
        <div className="view-modes">
          <button 
            className={viewMode === 'desktop' ? 'active' : ''}
            onClick={() => setViewMode('desktop')}
          >
            Desktop
          </button>
          <button 
            className={viewMode === 'mobile' ? 'active' : ''}
            onClick={() => setViewMode('mobile')}
          >
            Mobile
          </button>
        </div>
      </div>

      <div 
        className={`preview ${viewMode}`}
        style={{ 
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left' 
        }}
      >
        <ResumeContent 
          content={content}
          style={style}
          settings={settings}
        />
      </div>
    </div>
  );
};

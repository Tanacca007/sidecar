const ImageOptimization = ({ options, features, onChange }) => {
  return (
    <div className="image-optimization p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Image Optimization</h3>
      
      <div className="space-y-4">
        <QualitySelector
          value={options.quality}
          options={features.quality}
          onChange={(value) => onChange({ ...options, quality: value })}
        />
        
        <FormatConverter
          value={options.format}
          options={features.format}
          onChange={(value) => onChange({ ...options, format: value })}
        />
        
        <ResizeControl
          value={options.resizeStrategy}
          options={features.resizeStrategy}
          onChange={(value) => onChange({ ...options, resizeStrategy: value })}
        />
        
        <ImagePreview options={options} />
      </div>
    </div>
  );
};

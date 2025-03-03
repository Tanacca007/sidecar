const ExportCustomization = ({ format, onOptionsChange }) => {
  const [customOptions, setCustomOptions] = useState({
    watermark: {
      enabled: false,
      text: '',
      position: 'bottom-right',
      opacity: 0.5
    },
    security: {
      password: '',
      allowPrinting: true,
      allowCopying: false
    },
    metadata: {
      author: '',
      keywords: [],
      description: ''
    },
    optimization: {
      quality: 'high',
      compression: false,
      imageOptimization: true
    }
  });

  const handleOptionChange = (category, option, value) => {
    setCustomOptions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: value
      }
    }));
    onOptionsChange(customOptions);
  };

  return (
    <div className="export-customization space-y-6">
      <WatermarkControls
        options={customOptions.watermark}
        onChange={(option, value) => handleOptionChange('watermark', option, value)}
      />
      
      <SecurityControls
        options={customOptions.security}
        onChange={(option, value) => handleOptionChange('security', option, value)}
      />
      
      <MetadataControls
        options={customOptions.metadata}
        onChange={(option, value) => handleOptionChange('metadata', option, value)}
      />
      
      <OptimizationControls
        options={customOptions.optimization}
        onChange={(option, value) => handleOptionChange('optimization', option, value)}
      />
    </div>
  );
};

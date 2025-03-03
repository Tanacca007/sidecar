const ImageOptimizationPanel = ({ features }) => {
  return (
    <div className="panel p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Image Optimization</h3>
      
      <CompressionControl
        options={features.compression}
        onChange={(value) => handleCompressionChange(value)}
      />
      
      <FormatSelector
        formats={features.formats}
        onSelect={(format) => handleFormatSelection(format)}
      />
      
      <SizingStrategy
        strategies={features.sizing}
        onStrategy={(strategy) => handleSizingStrategy(strategy)}
      />
      
      <OptimizationPreview />
    </div>
  );
};

const CodeOptimizationPanel = ({ features }) => {
  return (
    <div className="panel p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Code Optimization</h3>
      
      <MinificationControl
        enabled={features.minification}
        onToggle={(enabled) => handleMinification(enabled)}
      />
      
      <TreeshakingControl
        enabled={features.treeshaking}
        onToggle={(enabled) => handleTreeshaking(enabled)}
      />
      
      <BundlingStrategy
        options={features.bundling}
        onSelect={(strategy) => handleBundling(strategy)}
      />
      
      <CodeAnalysis />
    </div>
  );
};

const AssetDeliveryPanel = ({ features }) => {
  return (
    <div className="panel p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Asset Delivery</h3>
      
      <CDNControl
        enabled={features.cdn}
        onToggle={(enabled) => handleCDN(enabled)}
      />
      
      <CachingStrategy
        options={features.caching}
        onSelect={(strategy) => handleCaching(strategy)}
      />
      
      <PreloadingControl
        options={features.preloading}
        onSelect={(strategy) => handlePreloading(strategy)}
      />
      
      <DeliveryAnalysis />
    </div>
  );
};

export { ImageOptimizationPanel, CodeOptimizationPanel, AssetDeliveryPanel };

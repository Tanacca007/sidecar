const AdvancedCustomizer = ({ settings, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('layout');

  const customizationOptions = {
    layout: {
      gridSystem: ['1-column', '2-column', 'asymmetric', 'modular'],
      sectionOrder: true,
      headerStyle: ['classic', 'modern', 'minimal', 'bold'],
      contentDensity: ['compact', 'balanced', 'spacious']
    },
    typography: {
      scale: ['small', 'medium', 'large'],
      contrast: ['low', 'medium', 'high'],
      lineHeight: ['compact', 'comfortable', 'spacious'],
      letterSpacing: ['tight', 'normal', 'wide']
    },
    effects: {
      shadows: ['none', 'subtle', 'medium', 'pronounced'],
      animations: ['none', 'fade', 'slide', 'scale'],
      borders: ['none', 'subtle', 'distinct', 'accent'],
      gradients: ['none', 'subtle', 'visible']
    }
  };

  return (
    <div className="advanced-customizer">
      <TabSelector
        tabs={Object.keys(customizationOptions)}
        activeTab={activeTab}
        onSelect={setActiveTab}
      />
      
      <div className="options-panel">
        {Object.entries(customizationOptions[activeTab]).map(([option, values]) => (
          <OptionControl
            key={option}
            name={option}
            values={values}
            current={settings[activeTab]?.[option]}
            onChange={(value) => onUpdate(activeTab, option, value)}
          />
        ))}
      </div>
    </div>
  );
};

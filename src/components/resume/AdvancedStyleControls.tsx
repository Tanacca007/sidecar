import { useState, useEffect } from 'react';

const AdvancedStyleControls = ({ settings, onUpdate }) => {
  const [activeTheme, setActiveTheme] = useState(settings.theme);

  const styleCategories = {
    typography: {
      fontWeight: ['300', '400', '500', '600', '700'],
      textTransform: ['none', 'uppercase', 'capitalize'],
      fontStyle: ['normal', 'italic'],
      letterSpacing: ['tight', 'normal', 'wide', 'wider'],
      lineHeight: ['1', '1.25', '1.5', '1.75', '2']
    },
    layout: {
      gridTemplates: ['standard', 'sidebar', 'three-column', 'mosaic'],
      sectionSpacing: ['compact', 'normal', 'relaxed', 'spacious'],
      borderStyles: ['none', 'solid', 'dotted', 'dashed'],
      borderWidth: ['0px', '1px', '2px', '4px']
    },
    effects: {
      transitions: ['none', 'fade', 'slide', 'scale'],
      shadows: ['none', 'sm', 'md', 'lg', 'xl'],
      opacity: ['100%', '90%', '80%', '70%'],
      blur: ['0px', '2px', '4px', '8px']
    }
  };

  return (
    <div className="advanced-style-controls p-6 bg-white rounded-lg shadow-lg">
      <ThemeSelector 
        activeTheme={activeTheme}
        onChange={setActiveTheme}
      />
      
      <StyleCategoryControls 
        categories={styleCategories}
        settings={settings}
        onUpdate={onUpdate}
      />
      
      <CustomCSSEditor 
        settings={settings}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default AdvancedStyleControls;

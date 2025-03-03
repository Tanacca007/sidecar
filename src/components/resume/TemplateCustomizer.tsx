import { useState } from 'react';
import ColorPicker from './customizer/ColorPicker';
import FontSelector from './customizer/FontSelector';
import SpacingControls from './customizer/SpacingControls';

interface CustomizerProps {
  onUpdate: (settings: CustomSettings) => void;
  template: any;
}

interface CustomSettings {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    sections: number;
    elements: number;
  };
  layout: {
    columns: number;
    alignment: 'left' | 'center' | 'right';
  };
}

const TemplateCustomizer = ({ onUpdate, template }: CustomizerProps) => {
  const [settings, setSettings] = useState<CustomSettings>({
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      text: '#111827',
      background: '#ffffff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Roboto'
    },
    spacing: {
      sections: 24,
      elements: 16
    },
    layout: {
      columns: 1,
      alignment: 'left'
    }
  });

  const handleUpdate = (key: string, value: any) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  return (
    <div className="customizer-panel bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6">Customize Template</h3>
      
      <div className="space-y-6">
        <section>
          <h4 className="font-semibold mb-3">Colors</h4>
          <ColorPicker
            colors={settings.colors}
            onChange={(colors) => handleUpdate('colors', colors)}
          />
        </section>

        <section>
          <h4 className="font-semibold mb-3">Typography</h4>
          <FontSelector
            fonts={settings.fonts}
            onChange={(fonts) => handleUpdate('fonts', fonts)}
          />
        </section>

        <section>
          <h4 className="font-semibold mb-3">Layout</h4>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={settings.layout.columns}
              onChange={(e) => handleUpdate('layout', {
                ...settings.layout,
                columns: Number(e.target.value)
              })}
              className="border rounded p-2"
            >
              <option value={1}>Single Column</option>
              <option value={2}>Two Columns</option>
            </select>
            
            <select
              value={settings.layout.alignment}
              onChange={(e) => handleUpdate('layout', {
                ...settings.layout,
                alignment: e.target.value
              })}
              className="border rounded p-2"
            >
              <option value="left">Left Aligned</option>
              <option value="center">Centered</option>
              <option value="right">Right Aligned</option>
            </select>
          </div>
        </section>

        <section>
          <h4 className="font-semibold mb-3">Spacing</h4>
          <SpacingControls
            spacing={settings.spacing}
            onChange={(spacing) => handleUpdate('spacing', spacing)}
          />
        </section>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => onUpdate(settings)}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default TemplateCustomizer;

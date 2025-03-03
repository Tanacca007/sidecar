import { useState } from 'react';

const ColorPicker = ({ colors, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <label className="capitalize">{key}</label>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange({
              ...colors,
              [key]: e.target.value
            })}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;

const SpacingControls = ({ spacing, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label>Section Spacing</label>
        <input
          type="range"
          min="16"
          max="48"
          value={spacing.sections}
          onChange={(e) => onChange({
            ...spacing,
            sections: Number(e.target.value)
          })}
          className="w-1/2"
        />
        <span>{spacing.sections}px</span>
      </div>
      
      <div className="flex items-center justify-between">
        <label>Element Spacing</label>
        <input
          type="range"
          min="8"
          max="32"
          value={spacing.elements}
          onChange={(e) => onChange({
            ...spacing,
            elements: Number(e.target.value)
          })}
          className="w-1/2"
        />
        <span>{spacing.elements}px</span>
      </div>
    </div>
  );
};

export default SpacingControls;

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const InteractiveCustomizer = ({ settings, onUpdate }) => {
  const [sections, setSections] = useState(settings.sections);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
    onUpdate({ ...settings, sections: items });
  };

  return (
    <div className="interactive-customizer p-6 bg-white rounded-lg shadow">
      <StyleEditor settings={settings} onUpdate={onUpdate} />
      <SectionReorderer sections={sections} onDragEnd={handleDragEnd} />
      <ElementStyler settings={settings} onUpdate={onUpdate} />
    </div>
  );
};

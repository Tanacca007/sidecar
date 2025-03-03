import { useState } from 'react';

const LiveElementEditor = ({ element, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="element-editor group relative p-2 hover:bg-gray-50 rounded">
      <div 
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
        onClick={() => setIsEditing(true)}
      >
        <button className="p-1 hover:bg-blue-100 rounded">
          <EditIcon className="w-4 h-4" />
        </button>
      </div>
      
      {isEditing ? (
        <ElementEditForm 
          element={element} 
          onSave={(updated) => {
            onUpdate(updated);
            setIsEditing(false);
          }}
        />
      ) : (
        <ElementPreview element={element} />
      )}
    </div>
  );
};

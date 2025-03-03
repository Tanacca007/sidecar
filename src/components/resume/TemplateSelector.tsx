import { useState } from 'react';

export const templates = [
  {
    id: 'modern',
    name: 'Modern',
    previewImage: '/templates/modern.png',
    className: 'bg-white'
  },
  {
    id: 'professional',
    name: 'Professional',
    previewImage: '/templates/professional.png',
    className: 'bg-gray-50'
  },
  {
    id: 'creative',
    name: 'Creative',
    previewImage: '/templates/creative.png',
    className: 'bg-blue-50'
  }
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedTemplate === template.id ? 'border-blue-600' : 'border-gray-200'
          }`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2 text-center font-medium">{template.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;

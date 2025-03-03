import { useState } from 'react';
import { templateStyles } from './templates/TemplateStyles';

interface TemplateGalleryProps {
  isPremiumUser: boolean;
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate: string;
}

const TemplateGallery = ({ isPremiumUser, onSelectTemplate, selectedTemplate }: TemplateGalleryProps) => {
  const [activeTab, setActiveTab] = useState<'free' | 'premium'>('free');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'free' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('free')}
        >
          Free Templates
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'premium' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('premium')}
        >
          Premium Templates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateStyles[activeTab].map((template) => (
          <div
            key={template.id}
            className={`relative rounded-lg overflow-hidden border-2 
              ${selectedTemplate === template.id ? 'border-blue-600' : 'border-gray-200'}`}
          >
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              {activeTab === 'premium' && !isPremiumUser && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                      Premium
                    </span>
                    <p className="text-white mt-2">Upgrade to access</p>
                  </div>
                </div>
              )}
              <button
                className={`mt-2 w-full py-2 px-4 rounded
                  ${(!isPremiumUser && activeTab === 'premium')
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                onClick={() => {
                  if (isPremiumUser || activeTab === 'free') {
                    onSelectTemplate(template.id);
                  }
                }}
                disabled={!isPremiumUser && activeTab === 'premium'}
              >
                {(!isPremiumUser && activeTab === 'premium')
                  ? 'Upgrade to Use'
                  : 'Use Template'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;

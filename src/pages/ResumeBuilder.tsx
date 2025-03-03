import React, { useState, useRef } from 'react';
import { generatePDF } from 'react-to-pdf';
import ResumePreview from './ResumePreview';
import TemplateSelector, { templates } from '../components/resume/TemplateSelector';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    surname: '',
    email: '',
    about: '',
    experience: [],
    competencies: [],
    references: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const resumeRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStep = (step) => {
    switch (step) {
      case 'template':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose a Template</h2>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </div>
        );
      case 'preview':
        return (
          <div ref={resumeRef} className={`space-y-8 p-8 rounded-lg shadow-lg ${
            templates.find(t => t.id === selectedTemplate)?.className
          }`}>
            {/* Previous preview content remains the same */}
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  generatePDF(resumeRef, {
                    filename: `${resumeData.name}_${resumeData.surname}_resume.pdf`,
                    page: { format: 'A4' }
                  });
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-8">
      {/* Form Section */}
      <div className="w-1/2">
        <form className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={resumeData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Surname</label>
            <input
              type="text"
              name="surname"
              value={resumeData.surname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={resumeData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">About</label>
            <textarea
              name="about"
              value={resumeData.about}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Add more form fields for experience, competencies, and references */}
        </form>
      </div>
      {/* Preview Section */}
      <div className="w-1/2 sticky top-0">
        {renderStep('preview')}
      </div>
    </div>
  );
};

export default ResumeBuilder;
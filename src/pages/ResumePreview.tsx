import React from 'react';

const ResumePreview = ({ resumeData }) => {
  return (
    <div className="bg-white shadow-lg p-8 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{resumeData.name} {resumeData.surname}</h1>
        <p className="text-gray-600">{resumeData.email}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-3">About Me</h2>
        <p className="text-gray-700">{resumeData.about}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-3">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{exp.role}</h3>
            <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700">{exp.duties}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-3">Key Competencies</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.competencies.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-3">References</h2>
        {resumeData.references.map((ref, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{ref.name}</p>
            <p className="text-gray-600">{ref.position}</p>
            <p className="text-gray-600">{ref.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;

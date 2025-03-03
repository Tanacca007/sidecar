import { useState } from 'react';

const ExportHandler = ({ resumeData, template }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  
  const exportFormats = {
    pdf: {
      icon: 'document-text',
      label: 'PDF Format',
      quality: 'high'
    },
    docx: {
      icon: 'document',
      label: 'Word Document',
      quality: 'standard'
    },
    html: {
      icon: 'code',
      label: 'Web Format',
      quality: 'responsive'
    }
  };

  return (
    <div className="export-container p-6 bg-white rounded-lg shadow-lg">
      <FormatSelector 
        formats={exportFormats}
        selected={exportFormat}
        onSelect={setExportFormat}
      />
      
      <ExportOptions format={exportFormat} />
      
      <SaveTemplate template={template} />
    </div>
  );
};
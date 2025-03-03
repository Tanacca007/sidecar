const ExportService = ({ resumeData, format, options }) => {
  const exportFormats = {
    pdf: async () => {
      const doc = await generatePDF(resumeData, options);
      return doc;
    },
    docx: async () => {
      const doc = await generateDOCX(resumeData, options);
      return doc;
    },
    html: () => {
      return generateHTML(resumeData, options);
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportFormats[format]();
      downloadFile(result, `resume.${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="export-actions mt-6">
      <button
        onClick={handleExport}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Export Resume
      </button>
    </div>
  );
};

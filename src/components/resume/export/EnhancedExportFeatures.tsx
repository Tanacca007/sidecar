const EnhancedExportFeatures = ({ resumeData }) => {
  const [shareableLink, setShareableLink] = useState('');
  
  const additionalFeatures = {
    async generateShareableLink() {
      const link = await createShareableLink(resumeData);
      setShareableLink(link);
    },

    async saveAsTemplate() {
      const template = await saveTemplate(resumeData);
      return template.id;
    },

    async exportToLinkedIn() {
      const profile = convertToLinkedInFormat(resumeData);
      return await exportToLinkedIn(profile);
    },

    async createPortfolio() {
      return await generatePortfolioSite(resumeData);
    }
  };

  return (
    <div className="enhanced-export-features">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(additionalFeatures).map(([feature, handler]) => (
          <button
            key={feature}
            onClick={handler}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium">{formatFeatureName(feature)}</h3>
          </button>
        ))}
      </div>
      
      {shareableLink && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="font-medium">Shareable Link:</p>
          <input
            value={shareableLink}
            readOnly
            className="w-full p-2 border rounded mt-2"
          />
        </div>
      )}
    </div>
  );
};

const ExportUtils = {
  async createShareableLink(resumeData) {
    const encoded = btoa(JSON.stringify(resumeData));
    const link = `${window.location.origin}/resume/share/${encoded}`;
    return link;
  },

  async saveTemplate(resumeData) {
    const template = {
      id: generateUniqueId(),
      name: resumeData.name,
      layout: resumeData.layout,
      styles: resumeData.styles,
      timestamp: new Date().toISOString()
    };
    
    return template;
  },

  convertToLinkedInFormat(resumeData) {
    return {
      profile: {
        headline: resumeData.title,
        summary: resumeData.summary
      },
      experience: resumeData.experience.map(exp => ({
        title: exp.role,
        company: exp.company,
        description: exp.description,
        startDate: exp.startDate,
        endDate: exp.endDate
      })),
      education: resumeData.education
    };
  }
};

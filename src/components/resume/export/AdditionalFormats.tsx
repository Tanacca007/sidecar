const AdditionalFormats = {
  async exportToMarkdown(resumeData) {
    const markdown = `
# ${resumeData.name}
## ${resumeData.title}

### Summary
${resumeData.summary}

### Experience
${resumeData.experience.map(exp => `
* ${exp.role} at ${exp.company}
  * ${exp.description}
`).join('\n')}
    `;
    return markdown;
  },

  async exportToJSON(resumeData) {
    return JSON.stringify(resumeData, null, 2);
  },

  async exportToPNG(resumeData) {
    const canvas = await html2canvas(document.getElementById('resume-content'));
    return canvas.toDataURL('image/png');
  },

  async exportToRTF(resumeData) {
    const rtf = generateRTFDocument(resumeData);
    return rtf;
  }
};

export { ExportUtils, AdditionalFormats };

const FormatHandlers = {
  async handlePDFExport(resumeData, options) {
    const pdfDoc = await FileGenerator.generatePDF(resumeData, {
      orientation: options.orientation,
      pageSize: options.pageSize,
      quality: options.quality,
      fonts: options.fonts,
      margins: options.margins,
      headerFooter: options.includeHeaderFooter,
      compression: options.compress ? 'FAST' : 'NONE'
    });
    
    return pdfDoc;
  },

  async handleDOCXExport(resumeData, options) {
    const docx = await FileGenerator.generateDOCX(resumeData, {
      compatibility: options.compatibility,
      tracking: options.tracking,
      styles: options.styles,
      references: options.includeReferences,
      tableOfContents: options.includeTableOfContents
    });
    
    return docx;
  },

  async handleHTMLExport(resumeData, options) {
    const html = await FileGenerator.generateHTML(resumeData, {
      responsive: options.responsive,
      darkMode: options.darkMode,
      analytics: options.analytics,
      seo: options.includeSEO,
      assets: options.includeAssets
    });
    
    return html;
  }
};

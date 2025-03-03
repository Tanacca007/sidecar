import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';
import html2canvas from 'html2canvas';

const FileGenerator = {
  async generatePDF(resumeData, options) {
    const doc = new jsPDF(options.orientation, 'pt', options.pageSize);
    
    // Custom PDF styling and layout
    const content = await html2canvas(document.getElementById('resume-content'));
    const imgData = content.toDataURL('image/png');
    
    doc.addImage(imgData, 'PNG', 0, 0);
    
    if (options.watermark) {
      doc.setTextColor(200);
      doc.text('Created with Resume Builder', 40, 20);
    }
    
    return doc;
  },

  async generateDOCX(resumeData, options) {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: resumeData.name,
            heading: true
          }),
          // Add more sections dynamically
        ]
      }]
    });

    return await Packer.toBlob(doc);
  },

  generateHTML(resumeData, options) {
    const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${options.darkMode ? getDarkModeStyles() : getLightModeStyles()}
            ${options.responsive ? getResponsiveStyles() : ''}
          </style>
        </head>
        <body>
          ${generateHTMLContent(resumeData)}
          ${options.analytics ? getAnalyticsScript() : ''}
        </body>
      </html>
    `;

    return template;
  }
};

export default FileGenerator;

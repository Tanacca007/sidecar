import { useEffect, useState } from 'react';

interface LivePreviewProps {
  settings: CustomSettings;
  content: ResumeContent;
  template: TemplateStyle;
}

const LivePreview = ({ settings, content, template }: LivePreviewProps) => {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const computedStyles = {
      container: `
        ${template.styles.container}
        font-family: ${settings.fonts.body};
        background-color: ${settings.colors.background};
        color: ${settings.colors.text};
        padding: ${settings.spacing.sections}px;
      `,
      header: `
        ${template.styles.header}
        font-family: ${settings.fonts.heading};
        color: ${settings.colors.primary};
        margin-bottom: ${settings.spacing.elements}px;
      `,
      section: `
        display: grid;
        grid-template-columns: repeat(${settings.layout.columns}, 1fr);
        gap: ${settings.spacing.elements}px;
        text-align: ${settings.layout.alignment};
      `
    };

    setStyles(computedStyles);
  }, [settings, template]);

  return (
    <div className="live-preview" style={styles.container}>
      <header style={styles.header}>
        <h1>{content.name}</h1>
        <div className="contact-info">{content.contact}</div>
      </header>

      {Object.entries(content.sections).map(([key, section]) => (
        <section key={key} style={styles.section}>
          <h2 style={{ color: settings.colors.secondary }}>{section.title}</h2>
          <div className="section-content">{section.content}</div>
        </section>
      ))}
    </div>
  );
};

export default LivePreview;

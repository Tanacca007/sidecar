import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImportHandler = ({ onImport }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        onImport(importedData);
      } catch (error) {
        console.error('Import failed:', error);
      }
    };

    reader.readAsText(file);
  }, [onImport]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/plain': ['.txt']
    }
  });

  return (
    <div {...getRootProps()} className="import-zone p-8 border-2 border-dashed rounded-lg text-center">
      <input {...getInputProps()} />
      <p className="text-lg">Drag & drop your resume data file here</p>
      <p className="text-sm text-gray-500">or click to select files</p>
    </div>
  );
};

export default ImportHandler;

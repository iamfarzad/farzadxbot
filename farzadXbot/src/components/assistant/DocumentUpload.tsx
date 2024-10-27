import React from 'react';
import { Upload } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (document: { name: string; type: string; content: string }) => void;
}

export const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      onUpload({
        name: file.name,
        type: file.type,
        content,
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <div className="mb-4">
      <label className="glass-button rounded-xl p-3 text-blue-300 flex items-center justify-center gap-2 cursor-pointer">
        <Upload size={20} />
        <span>Upload Document</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.md,.json"
        />
      </label>
    </div>
  );
};
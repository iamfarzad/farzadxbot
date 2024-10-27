import React, { useState } from 'react';
import { Search, File, Upload, X } from 'lucide-react';
import { DocumentProcessor } from '../../services/documents';
import { useStore } from '../../store';
import type { Document } from '../../types/assistant';

const processor = new DocumentProcessor();

export const DocumentViewer = () => {
  const { documents, addDocument } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    try {
      for (const file of Array.from(files)) {
        const content = await file.text();
        const doc = await processor.processDocument(content, file.type, {
          title: file.name
        });
        addDocument(doc);
      }
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const filteredDocuments = searchQuery
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents;

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Documents</h2>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full glass-card rounded-xl pl-10 pr-4 py-2 text-white bg-transparent"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mb-4 border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
        }`}
      >
        <input
          type="file"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          multiple
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload size={24} className="mb-2" />
          <span>{isDragging ? 'Drop files here' : 'Drop files or click to upload'}</span>
        </label>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="glass-card rounded-xl p-3 flex items-center gap-3"
          >
            <File size={16} className="text-blue-300" />
            <div className="flex-1">
              <div className="font-medium truncate">{doc.name}</div>
              {doc.summary && (
                <div className="text-sm text-gray-400 truncate">{doc.summary}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Search, File } from 'lucide-react';
import type { Document } from '../../types/assistant';

interface DocumentListProps {
  documents: Document[];
  onSearch: (query: string) => Document[];
}

export const DocumentList = ({ documents, onSearch }: DocumentListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredDocs = searchQuery ? onSearch(searchQuery) : documents;

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4 relative">
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

      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="glass-card rounded-xl p-3 flex items-center gap-3"
          >
            <File size={16} className="text-blue-300" />
            <span className="flex-1 truncate">{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
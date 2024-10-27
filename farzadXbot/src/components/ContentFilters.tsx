import React from 'react';
import { Filter, Hash, Languages, ThumbsDown } from 'lucide-react';
import type { ContentFilters as ContentFiltersType } from '../types';

export default function ContentFilters() {
  const filters: ContentFiltersType = {
    bannedWords: ['spam', 'offensive'],
    sensitiveTopics: ['politics', 'religion'],
    languagePreferences: ['en'],
    sentimentThresholds: {
      minimum: 0.3,
      maximum: 1.0
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="text-yellow-400" size={24} />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          Content Filters
        </h2>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <ThumbsDown size={16} />
            Banned Words
          </h3>
          <textarea
            className="w-full glass-card rounded-xl p-3 text-sm text-gray-300 bg-transparent resize-none h-24"
            placeholder="Enter banned words (one per line)"
            value={filters.bannedWords.join('\n')}
            onChange={() => {}}
          />
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Hash size={16} />
            Sensitive Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.sensitiveTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 rounded-full text-sm glass-card text-yellow-300 flex items-center gap-1"
              >
                {topic}
                <button className="hover:text-red-400 ml-1">×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            className="mt-3 w-full glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent"
            placeholder="Add new topic..."
          />
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Languages size={16} />
            Language Preferences
          </h3>
          <select className="w-full glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Sentiment Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Minimum</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={filters.sentimentThresholds.minimum}
                onChange={() => {}}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Maximum</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={filters.sentimentThresholds.maximum}
                onChange={() => {}}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
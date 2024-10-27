import React, { useState } from 'react';
import { Image, Link, Calendar, Send, Hash, X, AlertCircle } from 'lucide-react';
import type { Tweet, TweetType } from '../types';

interface TweetComposerProps {
  onClose?: () => void;
}

export default function TweetComposer({ onClose }: TweetComposerProps) {
  const [tweet, setTweet] = useState<Partial<Tweet>>({
    content: '',
    type: 'single',
    status: 'draft',
    metadata: {
      source: 'manual',
      tags: []
    }
  });
  const [tag, setTag] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tag.trim()) {
      setTweet(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          tags: [...(prev.metadata?.tags || []), tag.trim()]
        }
      }));
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTweet(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        tags: prev.metadata?.tags?.filter(t => t !== tagToRemove) || []
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tweet submission
    onClose?.();
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Compose Tweet
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 glass-button rounded-xl hover:text-red-400"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            className="w-full glass-card rounded-xl p-4 min-h-[120px] text-white bg-transparent resize-none"
            placeholder="What's happening?"
            value={tweet.content}
            onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
            maxLength={280}
          />
          <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
            <div className="flex items-center">
              {tweet.content && tweet.content.length > 240 && (
                <span className="flex items-center text-yellow-400 mr-2">
                  <AlertCircle size={14} className="mr-1" />
                  Approaching limit
                </span>
              )}
            </div>
            <span>{tweet.content?.length || 0}/280</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
          {tweet.metadata?.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-full glass-card text-blue-300"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-400"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <div className="flex items-center glass-card rounded-full px-3 py-1">
            <Hash size={14} className="text-gray-400" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-sm ml-1 w-20"
              placeholder="Add tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button type="button" className="p-2 glass-button rounded-xl">
            <Image size={20} className="text-blue-300" />
          </button>
          <button type="button" className="p-2 glass-button rounded-xl">
            <Link size={20} className="text-blue-300" />
          </button>
          <button
            type="button"
            className={`p-2 rounded-xl ${showScheduler ? 'glass-card text-blue-300' : 'glass-button'}`}
            onClick={() => setShowScheduler(!showScheduler)}
          >
            <Calendar size={20} className="text-blue-300" />
          </button>
          <div className="flex-grow" />
          <button
            type="submit"
            className="px-6 py-2 glass-button rounded-xl text-blue-300 flex items-center space-x-2 hover:bg-blue-500/10"
          >
            <Send size={16} />
            <span>Tweet</span>
          </button>
        </div>

        {showScheduler && (
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Schedule Tweet</h3>
            <input
              type="datetime-local"
              className="glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent w-full"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        )}
      </form>
    </div>
  );
}
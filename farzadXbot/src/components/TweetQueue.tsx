import React from 'react';
import { Clock, MoreVertical, Calendar, Trash2, Edit2 } from 'lucide-react';
import type { Tweet } from '../types';

export default function TweetQueue() {
  const tweets: Partial<Tweet>[] = [
    {
      id: '1',
      content: "Just launched our new feature! Check it out at...",
      scheduledTime: new Date('2024-03-20T14:30:00'),
      status: 'scheduled',
      type: 'single',
      metadata: {
        source: 'ai',
        tags: ['launch', 'tech']
      }
    },
    {
      id: '2',
      content: "Exciting news coming soon! Stay tuned for...",
      scheduledTime: new Date('2024-03-20T16:00:00'),
      status: 'draft',
      type: 'single',
      metadata: {
        source: 'manual',
        tags: ['announcement']
      }
    },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Tweet Queue
        </h2>
        <div className="flex gap-2">
          <select className="glass-button px-4 py-2 rounded-xl text-blue-300 bg-transparent">
            <option value="all">All Tweets</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="glass-button px-4 py-2 rounded-xl text-blue-300">
            New Tweet
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="glass-card rounded-xl p-4 hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 mr-4">
                <p className="text-sm line-clamp-2 text-gray-200">{tweet.content}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tweet.metadata?.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full glass-card text-blue-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:glass-button rounded-lg transition-all duration-200">
                  <Edit2 size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:glass-button rounded-lg transition-all duration-200">
                  <Calendar size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:glass-button rounded-lg transition-all duration-200">
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{tweet.scheduledTime?.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  via {tweet.metadata?.source}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs glass-card ${
                  tweet.status === 'scheduled' ? 'text-blue-300' : 'text-gray-400'
                }`}>
                  {tweet.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="glass-button px-4 py-2 rounded-xl text-blue-300">
          Load More
        </button>
      </div>
    </div>
  );
}
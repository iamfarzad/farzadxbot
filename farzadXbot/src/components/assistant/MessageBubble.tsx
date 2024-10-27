import React from 'react';
import type { Message } from '../../types/assistant';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-xl p-4 ${
          isAssistant
            ? 'bg-gray-800 text-white'
            : 'bg-blue-500 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.actions && message.actions.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            {message.actions.map((action, index) => (
              <div
                key={index}
                className="text-sm text-gray-300 flex justify-between"
              >
                <span>{action.type}</span>
                <span className="text-xs">{action.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { ChatInterface } from './ChatInterface';
import { DocumentViewer } from './DocumentViewer';
import { ActionPanel } from './ActionPanel';
import { MemoryPanel } from './MemoryPanel';
import useAssistantStore from '../../stores/assistantStore';

export const AssistantInterface = () => {
  const { currentSession, memory } = useAssistantStore();

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Left Sidebar - Memory & Context */}
      <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
        <MemoryPanel memory={memory} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>

      {/* Right Sidebar - Documents & Actions */}
      <div className="w-80 border-l border-gray-800 flex flex-col">
        <DocumentViewer />
        <ActionPanel />
      </div>
    </div>
  );
};
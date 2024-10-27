import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  isProcessing: boolean;
}

export const CommandInput = ({ onSubmit, isProcessing }: CommandInputProps) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !isProcessing) {
      onSubmit(command.trim());
      setCommand('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={isProcessing}
        placeholder={isProcessing ? 'Processing...' : 'Type a command...'}
        className="flex-1 glass-card rounded-xl p-3 text-white bg-transparent"
      />
      <button
        type="submit"
        disabled={isProcessing || !command.trim()}
        className="glass-button rounded-xl p-3 text-blue-300 hover:bg-blue-500/10 disabled:opacity-50"
      >
        <Send size={20} />
      </button>
    </form>
  );
};
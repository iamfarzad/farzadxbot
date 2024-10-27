import React from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';

interface Action {
  type: string;
  parameters: Record<string, unknown>;
  status: 'pending' | 'completed' | 'failed';
}

interface ActionCardProps {
  action: Action;
}

export const ActionCard = ({ action }: ActionCardProps) => {
  const getStatusIcon = () => {
    switch (action.status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'failed':
        return <XCircle size={16} className="text-red-400" />;
      default:
        return <Play size={16} className="text-blue-300" />;
    }
  };

  return (
    <div className="glass-card rounded-xl p-3 flex items-center gap-3">
      {getStatusIcon()}
      <div className="flex-1">
        <div className="font-medium">{action.type}</div>
        <div className="text-sm text-gray-400">
          {Object.entries(action.parameters)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')}
        </div>
      </div>
    </div>
  );
};
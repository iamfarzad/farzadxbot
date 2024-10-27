import React from 'react';
import { Brain, Sliders, MessageSquare } from 'lucide-react';
import type { AISettings as AISettingsType } from '../types';

export default function AISettings() {
  const settings: AISettingsType = {
    temperature: 0.7,
    maxTokens: 100,
    presencePenalty: 0.6,
    frequencyPenalty: 0.6,
    topP: 1,
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-purple-400" size={24} />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          AI Settings
        </h2>
      </div>

      <div className="space-y-6">
        {[
          { label: 'Temperature', value: settings.temperature, min: 0, max: 1, step: 0.1 },
          { label: 'Max Tokens', value: settings.maxTokens, min: 1, max: 200, step: 1 },
          { label: 'Presence Penalty', value: settings.presencePenalty, min: 0, max: 2, step: 0.1 },
          { label: 'Frequency Penalty', value: settings.frequencyPenalty, min: 0, max: 2, step: 0.1 },
          { label: 'Top P', value: settings.topP, min: 0, max: 1, step: 0.1 },
        ].map((setting) => (
          <div key={setting.label} className="glass-card rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-300">{setting.label}</label>
              <span className="text-sm text-blue-300">{setting.value}</span>
            </div>
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={() => {}}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            />
          </div>
        ))}

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <MessageSquare size={16} />
            Stop Sequences
          </h3>
          <textarea
            className="w-full glass-card rounded-xl p-3 text-sm text-gray-300 bg-transparent resize-none h-24"
            placeholder="Enter stop sequences (one per line)"
          />
        </div>
      </div>
    </div>
  );
}
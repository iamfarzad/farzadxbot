import React, { useState } from 'react';
import { Power, Bell, Shield, Zap } from 'lucide-react';

type Settings = {
  botStatus: boolean;
  notifications: boolean;
  safetyMode: boolean;
  autoReply: boolean;
};

export default function ControlPanel() {
  const [settings, setSettings] = useState<Settings>({
    botStatus: true,
    notifications: false,
    safetyMode: true,
    autoReply: false,
  });

  const handleToggle = (setting: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const controls = [
    { key: 'botStatus', label: 'Bot Status', Icon: Power },
    { key: 'notifications', label: 'Notifications', Icon: Bell },
    { key: 'safetyMode', label: 'Safety Mode', Icon: Shield },
    { key: 'autoReply', label: 'Auto Reply', Icon: Zap },
  ] as const;

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Control Panel
      </h2>

      <div className="space-y-4">
        {controls.map(({ key, label, Icon }) => (
          <div key={key} className="glass-card rounded-xl p-4 hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className="text-blue-400 mr-3" size={20} />
                <span className="text-gray-200">{label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings[key]}
                  onChange={() => handleToggle(key)}
                />
                <div className="w-11 h-6 glass-card peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/50"></div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium">
          Emergency Stop
        </button>
      </div>
    </div>
  );
}
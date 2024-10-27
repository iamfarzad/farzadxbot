import React, { useState } from 'react';
import { AlertTriangle, Archive, RotateCcw, Download, Shield } from 'lucide-react';
import type { EmergencyControls as EmergencyControlsType } from '../types';

export default function EmergencyControls() {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleEmergencyStop = async () => {
    try {
      setIsConfirming(true);
      // Implement emergency stop logic
    } catch (error) {
      console.error('Emergency stop failed:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-red-400" size={24} />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
          Emergency Controls
        </h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleEmergencyStop}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <Shield size={18} />
          Emergency Stop
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="glass-button px-4 py-3 rounded-xl text-blue-300 flex items-center justify-center gap-2">
            <Download size={18} />
            Backup
          </button>
          <button className="glass-button px-4 py-3 rounded-xl text-blue-300 flex items-center justify-center gap-2">
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
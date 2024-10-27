import React from 'react';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import type { SchedulingPreferences } from '../types';

export default function ScheduleManager() {
  const schedule: SchedulingPreferences = {
    startTime: '09:00',
    endTime: '21:00',
    timezone: 'UTC',
    preferredDays: ['monday', 'wednesday', 'friday'],
    postingFrequency: {
      minimum: 120,
      maximum: 240
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Schedule Manager
      </h2>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Clock size={16} />
            Active Hours
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Time</label>
              <input
                type="time"
                value={schedule.startTime}
                onChange={() => {}}
                className="glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Time</label>
              <input
                type="time"
                value={schedule.endTime}
                onChange={() => {}}
                className="glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent w-full"
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Calendar size={16} />
            Preferred Days
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <button
                key={day}
                className={`px-3 py-1 rounded-xl text-sm ${
                  schedule.preferredDays?.includes(day.toLowerCase())
                    ? 'glass-card text-blue-300'
                    : 'glass-button text-gray-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Posting Frequency</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Minimum time between posts (minutes)
              </label>
              <input
                type="number"
                value={schedule.postingFrequency?.minimum}
                onChange={() => {}}
                className="glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Maximum time between posts (minutes)
              </label>
              <input
                type="number"
                value={schedule.postingFrequency?.maximum}
                onChange={() => {}}
                className="glass-card rounded-xl p-2 text-sm text-gray-300 bg-transparent w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
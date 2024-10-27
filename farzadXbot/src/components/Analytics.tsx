import React from 'react';
import { LineChart, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import type { BotAnalytics } from '../types';

const mockAnalytics: Partial<BotAnalytics> = {
  performance: {
    engagementRate: 4.2,
    followerGrowth: 12.5,
    impressions: 15420,
    clickThroughRate: 2.8
  }
};

export default function Analytics() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Analytics Overview
        </h2>
        <select className="glass-button px-4 py-2 rounded-xl text-blue-300 bg-transparent">
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          {
            label: 'Engagement Rate',
            value: `${mockAnalytics.performance?.engagementRate}%`,
            change: '+0.8%',
            trend: 'up',
            icon: Activity
          },
          {
            label: 'Impressions',
            value: mockAnalytics.performance?.impressions?.toLocaleString(),
            change: '+12.5%',
            trend: 'up',
            icon: LineChart
          }
        ].map((metric) => (
          <div key={metric.label} className="glass-card rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`flex items-center ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
                <span className="ml-1">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="h-48 flex items-center justify-center text-gray-400">
          Graph visualization would go here
        </div>
      </div>
    </div>
  );
}
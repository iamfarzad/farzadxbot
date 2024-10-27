import React from 'react';
import { ArrowUp, Users, MessageSquare, BarChart, Zap } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      label: 'Total Tweets',
      value: '1,234',
      change: '+12%',
      icon: MessageSquare,
      color: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Followers',
      value: '5,678',
      change: '+8%',
      icon: Users,
      color: 'from-purple-400 to-purple-600',
    },
    {
      label: 'Engagement Rate',
      value: '4.2%',
      change: '+15%',
      icon: BarChart,
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      label: 'API Calls',
      value: '892/1000',
      change: '89.2%',
      icon: Zap,
      color: 'from-amber-400 to-amber-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div className="flex items-center text-green-400">
              <ArrowUp size={16} />
              <span className="ml-1 text-sm">{stat.change}</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm">{stat.label}</h3>
          <p className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
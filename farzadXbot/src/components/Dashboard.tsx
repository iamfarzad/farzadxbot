import React, { useState } from 'react';
import { Activity, Users, MessageSquare, TrendingUp, Settings, PlusCircle, Shield, Brain } from 'lucide-react';
import Stats from './Stats';
import TweetQueue from './TweetQueue';
import ControlPanel from './ControlPanel';
import Analytics from './Analytics';
import TweetComposer from './TweetComposer';
import AISettings from './AISettings';
import ContentFilters from './ContentFilters';
import ScheduleManager from './ScheduleManager';
import EmergencyControls from './EmergencyControls';
import TwitterConnect from './TwitterConnect';
import { useStore } from '../store';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useStore();
  const isTwitterConnected = user?.twitterConnected;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'compose', label: 'Compose', icon: PlusCircle },
    { id: 'queue', label: 'Queue', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'ai', label: 'AI Settings', icon: Brain },
    { id: 'filters', label: 'Filters', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    if (!isTwitterConnected) {
      return <TwitterConnect />;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Stats />
            <ControlPanel />
            <EmergencyControls />
          </div>
        );
      case 'compose':
        return <TweetComposer />;
      case 'queue':
        return <TweetQueue />;
      case 'analytics':
        return <Analytics />;
      case 'ai':
        return <AISettings />;
      case 'filters':
        return <ContentFilters />;
      case 'settings':
        return <ScheduleManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 glass-card rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'glass-card text-blue-300'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
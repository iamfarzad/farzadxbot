import React from 'react';
import { Twitter } from 'lucide-react';
import { twitterAuth } from '../services/twitter-auth';
import { useStore } from '../store';

export default function TwitterConnect() {
  const { user } = useStore();
  const isConnected = user?.twitterConnected;

  const handleConnect = async () => {
    try {
      await twitterAuth.connect();
    } catch (error) {
      console.error('Failed to connect Twitter:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await twitterAuth.disconnect();
      window.location.reload();
    } catch (error) {
      console.error('Failed to disconnect Twitter:', error);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Twitter className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Twitter Account
        </h2>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-200">Connected as:</p>
              <p className="text-sm text-gray-400">@{user?.twitterUsername}</p>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 glass-button rounded-xl text-red-400 hover:bg-red-500/10"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 mb-4">Connect your Twitter account to start using the bot</p>
          <button
            onClick={handleConnect}
            className="px-6 py-3 glass-button rounded-xl text-blue-300 hover:bg-blue-500/10"
          >
            Connect Twitter Account
          </button>
        </div>
      )}
    </div>
  );
}
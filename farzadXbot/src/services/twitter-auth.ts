import { authAPI } from './api';

export const twitterAuth = {
  // Initiate Twitter OAuth flow
  async connect() {
    try {
      const { data } = await authAPI.post('/auth/twitter/connect');
      // Redirect to Twitter OAuth page
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Failed to initiate Twitter OAuth:', error);
      throw error;
    }
  },

  // Disconnect Twitter account
  async disconnect() {
    try {
      await authAPI.post('/auth/twitter/disconnect');
    } catch (error) {
      console.error('Failed to disconnect Twitter account:', error);
      throw error;
    }
  }
};
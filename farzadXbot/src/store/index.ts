import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tweet, BotStats, BotSettings } from '../types';

interface State {
  tweets: Tweet[];
  stats: Partial<BotStats>;
  settings: Partial<BotSettings>;
  isAuthenticated: boolean;
  user: any | null;
  addTweet: (tweet: Tweet) => void;
  updateTweet: (tweet: Tweet) => void;
  deleteTweet: (id: string) => void;
  updateStats: (stats: Partial<BotStats>) => void;
  updateSettings: (settings: Partial<BotSettings>) => void;
  setAuth: (status: boolean, user?: any) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      tweets: [],
      stats: {},
      settings: {},
      isAuthenticated: false,
      user: null,
      addTweet: (tweet) =>
        set((state) => ({ tweets: [...state.tweets, tweet] })),
      updateTweet: (tweet) =>
        set((state) => ({
          tweets: state.tweets.map((t) => (t.id === tweet.id ? tweet : t)),
        })),
      deleteTweet: (id) =>
        set((state) => ({
          tweets: state.tweets.filter((t) => t.id !== id),
        })),
      updateStats: (stats) =>
        set((state) => ({ stats: { ...state.stats, ...stats } })),
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      setAuth: (status, user) =>
        set(() => ({ isAuthenticated: status, user })),
    }),
    {
      name: 'twitter-bot-storage',
      partialize: (state) => ({
        settings: state.settings,
        user: state.user,
      }),
    }
  )
);
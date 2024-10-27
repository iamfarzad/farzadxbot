import axios from 'axios';
import { Tweet } from '../types';

const twitterClient = axios.create({
  baseURL: 'https://api.twitter.com/2',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TWITTER_BEARER_TOKEN}`,
  },
});

export const twitterAPI = {
  // Tweet Management
  postTweet: async (content: string) => {
    return await twitterClient.post('/tweets', { text: content });
  },

  deleteTweet: async (tweetId: string) => {
    return await twitterClient.delete(`/tweets/${tweetId}`);
  },

  // User Management
  getFollowers: async (userId: string) => {
    return await twitterClient.get(`/users/${userId}/followers`);
  },

  follow: async (userId: string) => {
    return await twitterClient.post(`/users/${userId}/following`);
  },

  unfollow: async (userId: string) => {
    return await twitterClient.delete(`/users/${userId}/following`);
  },

  // Analytics
  getTweetAnalytics: async (tweetId: string) => {
    return await twitterClient.get(`/tweets/${tweetId}/metrics`);
  },
};
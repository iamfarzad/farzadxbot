import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

export const tweetAPI = {
  getTweets: () => api.get('/tweets'),
  createTweet: (tweet: any) => api.post('/tweets', tweet),
  updateTweet: (id: string, tweet: any) => api.put(`/tweets/${id}`, tweet),
  deleteTweet: (id: string) => api.delete(`/tweets/${id}`),
};

export const statsAPI = {
  getStats: () => api.get('/stats'),
  getAnalytics: (period: string) => api.get(`/analytics/${period}`),
};

export default api;
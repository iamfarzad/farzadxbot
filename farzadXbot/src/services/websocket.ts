import { io, Socket } from 'socket.io-client';
import { useStore } from '../store';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    if (this.socket?.connected) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // For development, we'll skip WebSocket connection
    if (import.meta.env.DEV) {
      console.log('WebSocket connection skipped in development mode');
      return;
    }

    try {
      this.socket = io(import.meta.env.VITE_WS_URL || '', {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('tweet:new', (tweet) => {
      useStore.getState().addTweet(tweet);
    });

    this.socket.on('tweet:update', (tweet) => {
      useStore.getState().updateTweet(tweet);
    });

    this.socket.on('stats:update', (stats) => {
      useStore.getState().updateStats(stats);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.log('WebSocket not connected, event not sent:', event);
    }
  }
}

export const wsService = new WebSocketService();
export default wsService;
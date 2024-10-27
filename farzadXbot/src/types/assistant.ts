export interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  embeddings?: number[];
  summary?: string;
  analysis?: {
    topics: string[];
    sentiment: number;
    entities: string[];
    keywords: string[];
    readability: number;
  };
}

export interface AssistantMemory {
  preferences: {
    topics: Array<{
      name: string;
      weight: number;
    }>;
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'archived';
  }>;
  analytics: {
    topPerformingContent: Array<{
      type: string;
      engagement: number;
    }>;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: Array<{
    type: string;
    parameters: Record<string, unknown>;
    status: 'pending' | 'completed' | 'failed';
  }>;
}

export interface Session {
  id: string;
  activeTask?: {
    type: string;
    description: string;
  };
  messages: Message[];
}
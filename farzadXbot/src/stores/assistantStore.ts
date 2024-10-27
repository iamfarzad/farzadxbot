import { create } from 'zustand';
import type { AssistantMemory, Message, Session, Document } from '../types/assistant';

interface AssistantStore {
  currentSession: Session;
  memory: AssistantMemory;
  documents: Document[];
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>) => void;
  addDocument: (document: Omit<Document, 'id'>) => void;
  searchDocuments: (query: string) => Document[];
}

const useAssistantStore = create<AssistantStore>((set, get) => ({
  currentSession: {
    id: 'default',
    messages: [],
  },
  memory: {
    preferences: {
      topics: [
        { name: 'Technology', weight: 0.8 },
        { name: 'AI', weight: 0.9 },
        { name: 'Development', weight: 0.7 },
      ],
    },
    projects: [
      {
        id: '1',
        name: 'Twitter Bot',
        description: 'AI-powered social media automation',
        status: 'active',
      },
    ],
    analytics: {
      topPerformingContent: [
        { type: 'Tech Updates', engagement: 85.5 },
        { type: 'AI News', engagement: 78.2 },
        { type: 'Dev Tips', engagement: 72.8 },
      ],
    },
  },
  documents: [],
  messages: [],
  addMessage: (message) => {
    const newMessage = {
      ...message,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
      currentSession: {
        ...state.currentSession,
        messages: [...state.currentSession.messages, newMessage],
      },
    }));
  },
  addDocument: (document) => {
    const newDocument = {
      ...document,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      documents: [...state.documents, newDocument],
    }));
  },
  searchDocuments: (query) => {
    const { documents } = get();
    return documents.filter((doc) =>
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
  },
}));

export default useAssistantStore;
import { Configuration, OpenAIApi } from 'openai';
import { useStore } from '../store';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export interface ContentAnalysis {
  topics: string[];
  sentiment: number;
  entities: string[];
  keywords: string[];
  readability: number;
}

export const nlpService = {
  async analyzeContent(text: string): Promise<ContentAnalysis> {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze the following text and provide structured information about topics, sentiment, entities, and keywords. Also assess readability."
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      return JSON.parse(response.data.choices[0].message?.content || '{}');
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw error;
    }
  },

  async generateEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: text
      });

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  },

  async generateSummary(text: string): Promise<string> {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Generate a concise summary of the following text."
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      return response.data.choices[0].message?.content || '';
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }
};
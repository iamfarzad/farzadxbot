import OpenAI from 'openai';
import type { AISettings } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export const openAIService = {
  generateTweet: async (prompt: string, settings: Partial<AISettings>) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4',
        temperature: settings.temperature || 0.7,
        max_tokens: settings.maxTokens || 100,
        presence_penalty: settings.presencePenalty || 0.6,
        frequency_penalty: settings.frequencyPenalty || 0.6,
        top_p: settings.topP || 1,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  },

  analyzeSentiment: async (text: string) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Analyze the sentiment of this text and return a score between -1 (negative) and 1 (positive): "${text}"`
          }
        ],
        model: 'gpt-4',
      });

      return parseFloat(completion.choices[0].message.content || '0');
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  },
};
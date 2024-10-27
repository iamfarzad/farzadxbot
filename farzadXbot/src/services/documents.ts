import { nlpService } from './nlp';
import type { Document } from '../types/assistant';
import { useStore } from '../store';

export class DocumentProcessor {
  async processDocument(
    content: string,
    type: string,
    metadata: { title?: string; category?: string }
  ): Promise<Document> {
    try {
      // Analyze content
      const analysis = await nlpService.analyzeContent(content);
      
      // Generate embeddings
      const embeddings = await nlpService.generateEmbeddings(content);
      
      // Generate summary
      const summary = await nlpService.generateSummary(content);
      
      // Create document
      const document: Document = {
        id: crypto.randomUUID(),
        name: metadata.title || 'Untitled Document',
        type,
        content,
        embeddings,
        summary,
        analysis
      };
      
      return document;
    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  }

  async findSimilarDocuments(query: string, threshold = 0.7): Promise<Document[]> {
    try {
      const queryEmbedding = await nlpService.generateEmbeddings(query);
      const documents = useStore.getState().documents;
      
      return documents
        .filter(doc => doc.embeddings)
        .map(doc => ({
          document: doc,
          similarity: this.cosineSimilarity(queryEmbedding, doc.embeddings!)
        }))
        .filter(result => result.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .map(result => result.document);
    } catch (error) {
      console.error('Error finding similar documents:', error);
      throw error;
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
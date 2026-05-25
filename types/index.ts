export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  language: string;
  isAdmin?: boolean;
  createdAt: string | Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface Source {
  id: string;
  title: string;
  excerpt: string;
  relevance: number;
  doc_id?: string;
  page?: number;
  lang?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date | string;
  language?: string;
  sources?: Source[];
  isStreaming?: boolean;
}

export interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date | string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  language?: string;
  languages?: Record<string, number>;
  pages?: number;
  error?: string;
}

export interface ConversationSession {
  id: string;
  userId: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  language: string;
  messages: Message[];
}

export interface AnalyticsData {
  totalQueries: number;
  totalUsers: number;
  totalDocuments: number;
  averageResponseTime: number;
  languageDistribution: { [key: string]: number };
  dailyQueries: { date: string; count: number }[];
}

export interface APIError {
  code: string;
  message: string;
  status: number;
}

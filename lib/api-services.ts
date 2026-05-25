import { getAxiosInstance } from './api-client';
import { Message, Document, User, AnalyticsData } from '@/types';

const api = () => getAxiosInstance();

/**
 * Auth service methods
 */
export const authService = {
  sendOTP: async (email: string, name?: string) => {
    const response = await api().post('/auth/send-otp', { email, full_name: name });
    return response.data;
  },

  login: async (email: string, otp: string) => {
    const response = await api().post('/auth/verify-otp', { email, otp, purpose: 'login' });
    return response.data;
  },

  signup: async (email: string, name: string, otp: string) => {
    // The /auth/send-otp call above already stored full_name in the OTP record metadata.
    const response = await api().post('/auth/verify-otp', { email, otp, purpose: 'signup' });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api().get('/auth/me');
    return response.data.user;
  },

  refresh: async (refreshToken: string) => {
    const response = await api().post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  logout: async (refreshToken: string) => {
    const response = await api().post('/auth/logout', { refresh_token: refreshToken });
    return response.data;
  },
};

/**
 * Chat service methods
 */
export const chatService = {
  sendMessage: async (sessionId: string, message: string) => {
    const response = await api().post('/chat/message', { sessionId, message });
    return response.data;
  },

  getSessionHistory: async (sessionId: string) => {
    const response = await api().get(`/chat/sessions/${sessionId}/messages`);
    return response.data.messages;
  },

  createSession: async (title?: string, documentIds?: string[]) => {
    const response = await api().post('/chat/sessions', { title, document_ids: documentIds });
    return response.data;
  },

  listSessions: async () => {
    const response = await api().get('/chat/sessions');
    return response.data.sessions;
  },

  deleteMessage: async (messageId: string) => {
    const response = await api().delete(`/chat/messages/${messageId}`);
    return response.data;
  },
};

/**
 * Document service methods
 */
export const documentService = {
  uploadDocument: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api().post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getDocuments: async () => {
    const response = await api().get('/documents');
    return response.data.documents;
  },

  getDocumentStatus: async (docId: string) => {
    const response = await api().get(`/documents/${docId}/status`);
    return response.data;
  },

  deleteDocument: async (docId: string) => {
    const response = await api().delete(`/documents/${docId}`);
    return response.data;
  },
};

/**
 * Admin service methods
 */
export const adminService = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api().get('/admin/analytics');
    return response.data;
  },

  getUsers: async () => {
    const response = await api().get('/admin/users');
    return response.data.users;
  },

  deleteUser: async (userId: string) => {
    const response = await api().delete(`/admin/users/${userId}`);
    return response.data;
  },
};

/**
 * Settings service methods
 */
export const settingsService = {
  updateProfile: async (data: Partial<User>) => {
    const response = await api().put('/settings/profile', data);
    return response.data;
  },

  getPreferences: async () => {
    const response = await api().get('/settings/preferences');
    return response.data;
  },

  updatePreferences: async (preferences: Record<string, any>) => {
    const response = await api().put('/settings/preferences', preferences);
    return response.data;
  },
};

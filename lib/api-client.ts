import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  clearAuthToken,
} from './auth';
import { APIError } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

let axiosInstance: AxiosInstance;
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: string) => void; reject: (e: any) => void }> = [];

function processQueue(error: any, token: string | null) {
  failedQueue.forEach((p) => (error || !token ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
}

/**
 * Initialize axios instance with interceptors
 */
export function initializeAxios(): AxiosInstance {
  axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = getAuthToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original: any = error.config;

      if (error.response?.status === 401 && original && !original._retry && typeof window !== 'undefined') {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(original);
          });
        }

        original._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error('No refresh token');

          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          setAuthToken(data.token, data.refreshToken);
          processQueue(null, data.token);
          original.headers.Authorization = `Bearer ${data.token}`;
          return axiosInstance(original);
        } catch (e) {
          processQueue(e, null);
          clearAuthToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) initializeAxios();
  return axiosInstance;
}

export function handleAPIError(error: unknown): APIError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const data: any = error.response?.data;
    const message =
      (typeof data?.detail === 'string' && data.detail) ||
      (typeof data?.message === 'string' && data.message) ||
      error.message ||
      'An error occurred';
    const code = data?.code || `HTTP_${status}`;
    console.error('[api] Error:', { code, message, status });
    return { code, message, status };
  }
  return { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred', status: 500 };
}

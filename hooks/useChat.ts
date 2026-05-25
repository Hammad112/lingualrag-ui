import { useState, useCallback, useRef, useEffect } from 'react';
import { Message } from '@/types';
import { getAxiosInstance, handleAPIError } from '@/lib/api-client';
import { getAuthToken } from '@/lib/auth';

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  deleteMessage: (id: string) => Promise<void>;
  loadHistory: (sessionId: string) => Promise<void>;
  stop: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Hook for chat/conversation management with streaming support.
 *
 * Uses fetch() + ReadableStream instead of EventSource so we can send the
 * Authorization bearer header. The backend emits SSE-style "data: {…}\n\n" frames.
 */
export function useChat(initialSessionId?: string): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null);
  const api = getAxiosInstance();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      setError(null);

      const userMessage: Message = {
        id: `${Date.now()}_user`,
        content,
        role: 'user',
        timestamp: new Date(),
      };
      const assistantId = `${Date.now()}_assistant`;
      const assistantMessage: Message = {
        id: assistantId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current?.abort();
      abortRef.current = controller;

      try {
        const token = getAuthToken();
        const res = await fetch(`${API_URL}/chat/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            query: content,
            session_id: sessionId,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulated = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let idx;
          while ((idx = buffer.indexOf('\n\n')) >= 0) {
            const frame = buffer.slice(0, idx).trim();
            buffer = buffer.slice(idx + 2);
            if (!frame.startsWith('data:')) continue;
            const json = frame.slice(5).trim();
            if (!json) continue;
            let evt: any;
            try {
              evt = JSON.parse(json);
            } catch {
              continue;
            }

            if (evt.type === 'session' && evt.sessionId) {
              setSessionId(evt.sessionId);
            } else if (evt.type === 'sources') {
              const srcs = evt.sources || [];
              setMessages((prev) => {
                const next = [...prev];
                const m = next.find((x) => x.id === assistantId);
                if (m) m.sources = srcs;
                return next;
              });
            } else if (evt.type === 'chunk') {
              accumulated += evt.content || '';
              setMessages((prev) => {
                const next = [...prev];
                const m = next.find((x) => x.id === assistantId);
                if (m) m.content = accumulated;
                return next;
              });
            } else if (evt.type === 'done') {
              setMessages((prev) => {
                const next = [...prev];
                const m = next.find((x) => x.id === assistantId);
                if (m) {
                  m.isStreaming = false;
                  if (evt.language) m.language = evt.language;
                }
                return next;
              });
              if (evt.session_id) setSessionId(evt.session_id);
            } else if (evt.type === 'error') {
              setError(evt.error || 'Stream error');
            }
          }
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        const apiError = handleAPIError(err);
        setError(apiError.message);
        setMessages((prev) => {
          const next = [...prev];
          const m = next.find((x) => x.id === assistantId);
          if (m) m.isStreaming = false;
          return next;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setSessionId(null);
  }, []);

  const deleteMessage = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/chat/messages/${id}`);
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } catch (err) {
        const apiError = handleAPIError(err);
        setError(apiError.message);
      }
    },
    [api]
  );

  const loadHistory = useCallback(
    async (sid: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/chat/sessions/${sid}/messages`);
        setMessages(response.data.messages || []);
        setSessionId(sid);
      } catch (err) {
        const apiError = handleAPIError(err);
        setError(apiError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [api]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sessionId,
    sendMessage,
    clearMessages,
    deleteMessage,
    loadHistory,
    stop,
  };
}

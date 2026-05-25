'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Copy,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamic import for RTL detection (client-side only)
let rtlDetect: any = null;
if (typeof window !== 'undefined') {
  rtlDetect = require('rtl-detect');
}

const checkRTL = (text: string): boolean => {
  if (!rtlDetect) return false;
  try {
    return rtlDetect.isRTLText(text);
  } catch {
    return false;
  }
};

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session
  useEffect(() => {
    setSessionId(`session_${Date.now()}`);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const input = inputValue;
    setInputValue('');
    await sendMessage(input);
    inputRef.current?.focus();
  };

  const isInputRTL = checkRTL(inputValue);

  return (
    <ProtectedLayout>
      <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-border md:px-6 md:py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Multilingual Chat
            </h1>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="mb-6 text-muted-foreground">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Start a Conversation
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Ask me anything about your documents. I support multiple languages
                including English, Arabic, Urdu, and more.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-xl px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p
                      className={`text-sm md:text-base ${
                        checkRTL(message.content)
                          ? 'text-right'
                          : 'text-left'
                      }`}
                      style={{
                        direction: checkRTL(message.content)
                          ? 'rtl'
                          : 'ltr',
                        unicodeBidi: 'embed',
                      }}
                    >
                      {message.content}
                    </p>

                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-black/10 space-y-2">
                        <p className="text-xs font-semibold opacity-75">Sources:</p>
                        {message.sources.map((source) => (
                          <div
                            key={source.id}
                            className="text-xs opacity-75 bg-black/5 p-2 rounded"
                          >
                            <p className="font-medium">{source.title}</p>
                            <p className="line-clamp-2">{source.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Streaming indicator */}
                    {message.isStreaming && (
                      <div className="mt-2 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-current animate-bounce" />
                        <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-100" />
                        <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-200" />
                      </div>
                    )}

                    {/* Message actions */}
                    {!message.isStreaming && message.role === 'assistant' && (
                      <div className="mt-2 flex gap-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(message.content);
                          }}
                          className="p-1 hover:bg-black/10 rounded transition-smooth"
                          title="Copy"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Loading skeleton */}
          {isLoading && messages.length === 0 && (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-12 w-3/4 rounded-lg"
                  style={{
                    marginLeft: i % 2 === 0 ? 'auto' : '0',
                  }}
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-background md:p-6">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your question... (Supports multiple languages)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="h-11 md:h-12"
              dir={isInputRTL ? 'rtl' : 'ltr'}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              size="lg"
              className="px-4 h-11 md:h-12 md:px-6"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </Button>
          </form>
        </div>
      </div>
    </ProtectedLayout>
  );
}

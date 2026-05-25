'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/chat');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-50px', left: '-50px' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ bottom: '-50px', right: '-50px' }}
        />
      </div>

      {/* Loading state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Image src="/logo.png" alt="LingualRAG" width={80} height={80} />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          LingualRAG
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Multilingual AI-Powered Document Understanding
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0.1s' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

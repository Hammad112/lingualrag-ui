'use client';

import { useEffect } from 'react';
import { initializeAxios } from '@/lib/api-client';

/**
 * Client-side provider component for initializing API client
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize axios with interceptors
    initializeAxios();
  }, []);

  return <>{children}</>;
}

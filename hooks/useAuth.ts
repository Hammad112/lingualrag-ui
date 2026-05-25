import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/types';
import { handleAPIError } from '@/lib/api-client';
import { authService } from '@/lib/api-services';
import {
  setAuthToken,
  clearAuthToken,
  isAuthenticated,
  getRefreshToken,
} from '@/lib/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  sendOTP: (email: string, name?: string) => Promise<void>;
  login: (email: string, otp: string) => Promise<void>;
  signup: (email: string, name: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {
      try {
        if (isAuthenticated()) {
          const u = await authService.getCurrentUser();
          setUser(u);
        }
      } catch (err) {
        handleAPIError(err);
        clearAuthToken();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const sendOTP = useCallback(async (email: string, name?: string) => {
    setError(null);
    try {
      await authService.sendOTP(email, name);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
      throw err;
    }
  }, []);

  const login = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, otp);
      setAuthToken(data.token, data.refreshToken);
      setUser(data.user);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, name: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.signup(email, name, otp);
      setAuthToken(data.token, data.refreshToken);
      setUser(data.user);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const rt = getRefreshToken();
      if (rt) await authService.logout(rt);
    } catch {}
    clearAuthToken();
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user && isAuthenticated(),
    error,
    sendOTP,
    login,
    signup,
    logout,
  };
}

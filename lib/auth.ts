import Cookies from 'js-cookie';

export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

const ACCESS_KEY = 'authToken';
const REFRESH_KEY = 'refreshToken';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return Cookies.get(ACCESS_KEY) || localStorage.getItem(ACCESS_KEY) || null;
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return Cookies.get(REFRESH_KEY) || localStorage.getItem(REFRESH_KEY) || null;
}

export function setAuthToken(token: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  // Cookies for SSR/middleware, localStorage for streaming (fetch reads it sync).
  // For local dev keep secure=false so cookies work over plain http.
  const isHttps = typeof location !== 'undefined' && location.protocol === 'https:';
  Cookies.set(ACCESS_KEY, token, { expires: 1, secure: isHttps, sameSite: 'lax' });
  Cookies.set(REFRESH_KEY, refreshToken, { expires: 30, secure: isHttps, sameSite: 'lax' });
  localStorage.setItem(ACCESS_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  Cookies.remove(ACCESS_KEY);
  Cookies.remove(REFRESH_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!getAuthToken();
}

export function decodeJwt(token: string): TokenPayload | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export function getLanguagePreference(): string {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('languagePreference') || 'en';
}

export function setLanguagePreference(lang: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('languagePreference', lang);
}

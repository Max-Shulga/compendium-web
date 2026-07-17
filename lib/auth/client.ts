import type { TAuthTokens } from '@/app/auth/_models/auth.model';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import { API_URL, HTTP_METHODS } from '@/lib/api/constants/api.constant';

const getAccessToken = (): string => localStorage.getItem('accessToken') ?? '';

const getRefreshToken = (): string => localStorage.getItem('refreshToken') ?? '';

const setAuthTokens = (tokens: TAuthTokens): void => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  document.cookie = `accessToken=${encodeURIComponent(tokens.accessToken)}; path=/; SameSite=Lax`;
};

const clearAuthTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; path=/; max-age=0';
};

const refreshAccessToken = async (): Promise<TAuthTokens> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_URL}${API_ENDPOINTS.auth.refreshTokens}`, {
    method: HTTP_METHODS.post,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const tokens = await response.json() as TAuthTokens;
  setAuthTokens(tokens);

  return tokens;
};

export default getAccessToken;
export { clearAuthTokens, getRefreshToken, refreshAccessToken, setAuthTokens };

import type { TAuthTokens } from '@/app/auth/_models/auth.model';

const getAccessToken = (): string => localStorage.getItem('accessToken') ?? '';

const setAuthTokens = (tokens: TAuthTokens): void => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  document.cookie = `accessToken=${encodeURIComponent(tokens.accessToken)}; path=/; SameSite=Lax`;
};

// const clearAuthTokens = (): void => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
//   document.cookie = 'accessToken=; path=/; max-age=0';
// };

export default getAccessToken;
export { setAuthTokens };

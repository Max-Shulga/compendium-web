import type { SignUpDto, SignInDto, TAuthTokens } from '@/app/auth/_models/auth.model';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import apiRequest from '@/lib/api/client';
import { HTTP_METHODS } from '@/lib/api/constants/api.constant';

const authApi = {
  signUp: (data: SignUpDto): Promise<void> =>
    apiRequest(API_ENDPOINTS.auth.signUp, { method: HTTP_METHODS.post, body: data }),

  signIn: (data: SignInDto): Promise<TAuthTokens> =>
    apiRequest(API_ENDPOINTS.auth.signIn, { method: HTTP_METHODS.post, body: data }),

  refreshTokens: (refreshToken: string): Promise<TAuthTokens> =>
    apiRequest(API_ENDPOINTS.auth.refreshTokens, {
      method: HTTP_METHODS.post,
      body: { refreshToken }
    })
};

export { authApi };

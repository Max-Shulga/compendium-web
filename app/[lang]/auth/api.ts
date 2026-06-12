import apiRequest from '@/lib/api/client';

type SignUpDto = {
  email: string;
  password: string;
};

type SignInDto = {
  email: string;
  password: string;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const authApi = {
  signUp: (data: SignUpDto): Promise<void> =>
    apiRequest('/auth/sign-up', { method: 'POST', body: data }),

  signIn: (data: SignInDto): Promise<AuthTokens> =>
    apiRequest('/auth/sign-in', { method: 'POST', body: data }),

  refreshTokens: (refreshToken: string): Promise<AuthTokens> =>
    apiRequest('/auth/refresh-tokens', {
      method: 'POST',
      body: { refreshToken }
    })
};

export { authApi };
export type { AuthTokens, SignInDto, SignUpDto };

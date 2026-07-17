import { ROUTES } from '@/core/constants/routes.constant';
import getAccessToken, {
  clearAuthTokens,
  getRefreshToken,
  refreshAccessToken
} from '@/lib/auth/client';

import { API_URL, HTTP_UNAUTHORIZED } from './constants/api.constant';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  body?: unknown;
} & Omit<RequestInit, 'body'>

const resolveToken = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  return getAccessToken() || undefined;
};

const buildHeaders = (
  extraHeaders: RequestOptions['headers'],
  hasBody: boolean,
  token?: string
): Headers => {
  const headers = new Headers(extraHeaders as HeadersInit);
  if (hasBody) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessTokenOnce = (): Promise<string> => {
  refreshPromise ??= refreshAccessToken()
    .then((tokens) => tokens.accessToken)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

const redirectToSignIn = (): void => {
  clearAuthTokens();
  if (typeof window !== 'undefined') {
    window.location.href = ROUTES.auth.signIn;
  }
};

const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {},
  isRetry = false
): Promise<T> => {
  const { body, headers: extraHeaders, ...fetchOptions } = options;
  const token = resolveToken();
  const headers = buildHeaders(extraHeaders, body !== undefined, token);

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const shouldRetryWithRefresh =
    response.status === HTTP_UNAUTHORIZED &&
    !isRetry &&
    typeof window !== 'undefined' &&
    getRefreshToken();

  if (shouldRetryWithRefresh) {
    try {
      await refreshAccessTokenOnce();

      return await apiRequest<T>(path, options, true);
    } catch {
      redirectToSignIn();
      throw new ApiError(HTTP_UNAUTHORIZED, null, 'Session expired');
    }
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as Record<string, unknown>).message)
        : `HTTP ${response.status}`;
    throw new ApiError(response.status, data, message);
  }

  return data as T;
};

export default apiRequest;

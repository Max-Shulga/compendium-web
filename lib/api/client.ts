import getAccessToken from '@/lib/auth/client';

import { API_URL } from './constants/api.constant';

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

const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { body, headers: extraHeaders, ...fetchOptions } = options;

  const headers = new Headers(extraHeaders as HeadersInit);
  if (body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const token = resolveToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

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

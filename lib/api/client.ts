const API_URL =
  (typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) ?? 'http://localhost:3000';

class ApiError extends Error {
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
  token?: string;
  body?: unknown;
} & Omit<RequestInit, 'body'>

async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, body, headers: extraHeaders, ...fetchOptions } = options;

  const headers = new Headers(extraHeaders as HeadersInit);
  if (body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
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
}

export default apiRequest ;

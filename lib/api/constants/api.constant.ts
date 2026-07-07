const API_URL =
  (typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) ?? 'http://localhost:3000';

const HTTP_NOT_FOUND = 404;

const HTTP_METHODS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE'
} as const;

export {
  API_URL,
  HTTP_NOT_FOUND,
  HTTP_METHODS
};

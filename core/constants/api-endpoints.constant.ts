const API_ENDPOINTS = {
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    refreshTokens: '/auth/refresh-tokens'
  },
  cards: {
    list: '/cards',
    detail: (id: number | string) => `/cards/${id}`
  },
  topics: {
    list: '/topics',
    detail: (id: number | string) => `/topics/${id}`,
    cards: (id: number | string) => `/topics/${id}/cards`
  },
  categories: {
    list: '/categories',
    detail: (id: number | string) => `/categories/${id}`,
    items: (id: number | string) => `/categories/${id}/items`
  }
};

export { API_ENDPOINTS };

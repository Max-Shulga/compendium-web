const ROUTES = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up'
  },
  profile: '/profile',
  topics: {
    list: '/topics',
    new: '/topics/new',
    detail: (id: number | string) => `/topics/${id}`,
    edit: (id: number | string) => `/topics/${id}/edit`
  },
  categories: {
    list: '/categories',
    new: '/categories/new',
    detail: (id: number | string) => `/categories/${id}`,
    edit: (id: number | string) => `/categories/${id}/edit`
  }
};

export { ROUTES };

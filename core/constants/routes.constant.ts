const ROUTES = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up'
  },
  topics: {
    list: '/topics',
    new: '/topics/new',
    detail: (id: number | string) => `/topics/${id}`,
    edit: (id: number | string) => `/topics/${id}/edit`
  }
};

export { ROUTES };

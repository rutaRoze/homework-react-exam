const Config = {
  version: 0.1,

  apiDomain: 'http://localhost:8080',

  endpoints: {
    auth: {
      register: '/auth/register',
      login: '/auth/login'
    },
    category: {
      create: '/category',
      update: '/category/{id}',
      getAll: '/category',
      delete: '/category/{id}'
    },
    book: {
      create: '/book',
      update: '/book/{id}',
      getAll: '/book',
      getOne: '/book/{id}',
      delete: '/book/{id}'
    },
    like: {
      like: '/like',
      unlike: '/like',
      countBookLikes: '/like/book/{id}/count'
    }
  }
};

export default Config;
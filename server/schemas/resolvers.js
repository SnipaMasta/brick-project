const resolvers = {
  User: {
    _id: () => '5f34f3f3e3e3e3e3e3e3e3e3',
    username: () => 'username',
    email: () => 'email',
    password: () => 'password',
  },

  Auth: {
    token: () => '5f34f3f3e3e3e3e3e3e3e3e3',
    user: () => {
      return {
        _id: '5f34f3f3e3e3e3e3e3e3e3e3',
      }
  }, 
  },
}

module.exports = resolvers;
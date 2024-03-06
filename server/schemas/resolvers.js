const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      try {
        return await User.findById(id);
      } catch (err) {
        throw new Error ('failed to find user');
      }
    },

    allSets: async (parent, args) => {
      const requestUrl = `https://rebrickable.com/api/v3/lego/sets/?key=${process.env.LEGO_KEY}`
      const response = await fetch(requestUrl)
      const data = await response.json()
      console.log(data);
      return await Review.find({});
    }
  },


Mutation: {
  addUser: async (parent, {username, email, password})  => {
    try {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {user:user, token:token};
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw AuthenticationError;
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw AuthenticationError;
    }

    const token = signToken(user);
    return { token, user };
  },

},

  // Auth: {
  //   token: () => '5f34f3f3e3e3e3e3e3e3e3e3',
  //   user: () => {
  //     return {
  //       _id: '5f34f3f3e3e3e3e3e3e3e3e3',
  //     }
  // }, 
  // },
} 


module.exports = resolvers;

//async resolvers
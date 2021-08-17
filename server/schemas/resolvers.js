const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, { _id }) => {
      const params = _id ? { _id } : {}
      return User.find(params)
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args)
      return user
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Sorry, bad credentials.')
      }

      const correctPw = await profile.isCorrectPassword(password)

      if (!correctPW) {
        throw new AuthenticationError('Sorry, bad credentials.')
      }

      const token = signToken(user)
      return { token, user }
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user.id },
          { $addToSet: { savedBooks: args } },
          { new: true }
      )
      return updatedUser
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        )
        return updatedUser
      }
    }
  }
}

module.exports = resolvers;
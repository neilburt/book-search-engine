const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('You are not logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return { token, user }
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
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user.id },
          { $push: { savedBooks: bookData } },
          { new: true }
      )
      return updatedUser
      }
    },
    removeBook: async (parent, { bookId }, context) => {
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
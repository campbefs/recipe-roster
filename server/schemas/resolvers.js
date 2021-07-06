const { User, Post, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    // me
    me: async (_parent, _args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id})
          .select('-__v -password')
          .populate('follows')
          .populate('posts')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Find One user
    // getSingleUser

    // Find One Post
    // getSinglePost _id

    // Find One Recipe
    // getSingleRecipe

    // Find friend's posts - findOne, friend's posts -- 
    // Just populate 1 user's friends. Then populate Posts, then populate Recipe
    // getFriendPosts

  },

  Mutation: {

    // addUser
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Login
    login: async(_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // create Post (save recipe)
    createPost: async (_parent, { recipeId }, context) => {
      if (context.user) {
        const post = await Post.create( {recipeId, username: context.user.username })
          .populate('recipes');

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id }},
          { new: true }
        )
      }


    },

    // add recipe
    addRecipe: async (_parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const recipe = await Recipe.create(input);

      return recipe;
      
    },

    // Add friend


    // addComment

    // deleteComment

    // deletePost

    // like a post ?? not NoSQL, and not tech haven.


  }
};

module.exports = resolvers;
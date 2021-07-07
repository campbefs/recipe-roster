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

    // getSingleUser

    // getSinglePost 
    // takes postId

    // getSingleRecipe
    // takes recipeId OR uri  // look up examples of 'OR' 


    // getFriendsPosts
    // get single user => populate follows => populate posts (how to double populate...?)

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

    // add recipe
    addRecipe: async (_parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const recipe = await Recipe.create(input);

      return recipe;
      
    },

    // create Post (save recipe)
    createPost: async (_parent, { recipeId }, context) => {
      if (context.user) {
        console.log(recipeId);
        const post = await Post.create( {recipeId, username: context.user.username })
          // .populate('recipes'); // doesn't work on create

        // add post ID to user model
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id }},
          { new: true }
        )

        return post;
      }


    },


    // Add Follow
    addFollow: async (_parent, { followId }, context) => {
      if (context.user) {
        
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { follows: followId }}, // addToSet will prevent duplicates
          { new: true }
        )

        // return user.populate();
        return User.findOne({_id: context.user._id})
          .populate({path:'follows', populate: { path: 'posts'}}); // populate subpath
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    // addComment
    // takes postId
    addComment: async (_parent, { postId, commentText }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: {username: context.user.username, commentText}}},
        { new: true }
      );

      return post;
    },

    // deleteComment
    // takes postId and commentId
    deleteComment: async (_parent, { postId, commentId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const userCheck = await Post.findOne(
        { _id: postId, comments: { $elemMatch: { _id: commentId }}}
      )

      // console.log(userCheck.comments[0].username);
      // console.log(userCheck.comments.length);

      // check if data exists
      if (userCheck.comments.length === 0 || !userCheck) {
        return 'No match for that user & comment'
      }

      // check if comment user matches the context user
      if (userCheck.comments[0].username !== context.user.username) {
        return 'No match for that user & comment'
      }

      // console.log(context.user.username);

      // remove comment
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId }}},
        { new: true }
      );

      return userCheck;
    },



    // deletePost

    // likePost
    
    // rateRecipe 


  }
};

module.exports = resolvers;
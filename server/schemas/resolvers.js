const { User, Post, Recipe } = require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
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

    // create Post (save recipe)  -- add a field of users that like the post
    createPost: async (_parent, { recipeId }, context) => {
      if (context.user) {
        // console.log(recipeId);

        // Create the Post
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

    addRecipeAndPost: async (_parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // check if recipe already exists in DB. if so, grab RecipeId
      let recipe = await Recipe.findOne({ uri: input.uri });
  
      // if not create recipe
      if (!recipe) {
        recipe = await Recipe.create(input);
      }
      // console.log('recipeId: ', recipe._id);

      // Create the Post
      const post = await Post.create( {
                          recipeId: recipe._id, 
                          username: context.user.username 
                        })

      // add post ID to user model
      await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { posts: post._id }},
        { new: true }
      )

      return post;
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


    // addComment  -- error handling - post doesn't exist?
    // takes postId
    addComment: async (_parent, { postId, commentText }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // check if post exists
      const postCheck = await Post.findOne({ _id: postId });
      if (!postCheck) {
        throw new UserInputError('No post found');
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

      // Find the Comment in the Post table
      const userCheck = await Post.findOne(
        { _id: postId, comments: { $elemMatch: { _id: commentId }}}
      )

      // console.log(userCheck.comments[0].username);
      // console.log(userCheck.comments.length);

      // check if data exists
      if (!userCheck) {
        throw new UserInputError('No match for the inputs provided');
      }

      // check if comment user matches the context user
      if (userCheck.comments[0].username !== context.user.username) {
        throw new AuthenticationError('You are not authorized to delete this comment');
      }

      // Remove comment
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId }}},
        { new: true }
      );

      return userCheck;
    },

    // deletePost
    deletePost: async (_parent, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      // check if post is found with that ID 
      const postCheck = await Post.findOne({ _id: postId });
      
      if (!postCheck) {
        throw new UserInputError('No post found with that ID');
      }

      // check if post username matches context
      if (postCheck.username !== context.user.username) {
        throw new AuthenticationError('You are not authorized to delete this post!');
      }

      // delete post 
      const post = await Post.findOneAndDelete({_id: postId});

      // remove post from User model
      await User.findOneAndUpdate(
        { _id: context.user._id},
        { $pull: { posts: { _id: postId }}},
        { new: true}
      );

      return post;

    }

    
    // rateRecipe 



  }
};

module.exports = resolvers;
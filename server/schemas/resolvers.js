const { User, Post, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    // me

    // Find One user

    // Find One Post

    // Find One Recipe

    // Find friend's posts - findOne, friend's posts -- 
    // Just populate 1 user's friends. Then populate Posts, then populate Recipe

  },

  Mutation: {

    // addUser

    // Login

    // create Post (save recipe)

    // addComment

    // deleteComment

    // deletePost

    // like a post ?? not NoSQL, and not tech haven.


  }
};

module.exports = resolvers;
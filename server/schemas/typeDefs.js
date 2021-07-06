const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Comment {
    commentId: ID
    commentText: String
    username: String
    createdAt: Float
  }

  type Recipe {
    uri: String
    label: String
    image: String
    source: String
    url: String
    shareAs: String
    yield: Int
    calories: Float
    dietLabels: [String]
    ingredientLines: [String]
    cuisineType: [String]
    mealType: [String]
    dishType: [String]
    ratings: [Int]
    updated: Float
    # avgRating: Float
    # ratingCount: Int
  }

  type Post {
    _id: ID
    username: String
    recipe: ID
    comments: [Comment]
    createdAt: Float
  }

  type User {
    _id: ID
    username: String
    email: String
    follows: [User]
    posts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  input RecipeInput {
    uri: String!
    label: String!
    image: String
    source: String
    url: String
    shareAs: String
    yield: Int
    calories: Float
    dietLabels: [String]
    ingredientLines: [String]
    cuisineType: [String]
    mealType: [String]
    dishType: [String]
    ratings: [Float]
  }

  type Query {
    me: User
    getSingleUser(username: String!): User
    getSinglePost(_id: ID!): Post # is this right? 
    getSingleRecipe(uri: String!): Recipe

    getFriendPosts(username: String!): User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth # OK
    login(email: String!, password: String!): Auth # OK

    createPost(recipeId: String!): Post
    # createPost(username: String!, uri: String): Post  # username &  recipe uri
    # ^ may need to make an input to take all recipe columns

    addRecipe(input: RecipeInput!): Recipe



    addComment(_id: ID!, commentText: String!, username: String!): Post  #takes post ID

    deleteComment(_id: ID!, commentId: ID!): Post # post ID and comment ID

    deletePost(_id: ID!): Post # post ID

    # Like a post??

  }

`;

module.exports = typeDefs;
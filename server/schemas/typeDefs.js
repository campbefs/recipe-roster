const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Comment {
    commentId: ID
    commentText: String
    username: String
    createdAt: Float
  }

  type Recipe {
    _id: ID
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
    recipeId: ID
    comments: [Comment]
    createdAt: String
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
    me: User # OK

    getSingleUser(username: String!): User

    getSinglePost(postId: ID!): Post 

    getSingleRecipe(uri: String!): Recipe

    getFriendPosts(username: String!): User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth # OK
    login(email: String!, password: String!): Auth # OK

    addRecipe(input: RecipeInput!): Recipe # OK

    createPost(recipeId: ID!): Post # OK
    # createPost(username: String!, uri: String): Post  # username &  recipe uri
    # ^ may need to make an input to take all recipe columns

    addFollow(followId: ID!): User # OK

    # remove follow 

    addComment(postId: ID!, commentText: String!, username: String!): Post  #

    deleteComment(postId: ID!, commentId: ID!): Post # 

    deletePost(postId: ID!): Post # 

    # deleteRecipe?

    # Like a post?

    # Rate a recipe?

  }

`;

module.exports = typeDefs;
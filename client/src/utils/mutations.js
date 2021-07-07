import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser ($username: String!, $password: String!, $email: String!){
    addUser(username:$username, password:$password, email: $email){
      token 
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($uri:String!, $label:String!) {
    addRecipe( input:{ uri: $uri, label:$label})
    {
      _id
      uri
      label
      image
      source
      url
      shareAs
      yield
      calories
      dietLabels
      ingredientLines
      cuisineType
      mealType
      dishType
      ratings
      updated
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation addFollow ($followId: ID!) {
    addFollow(followId:$followId){
      username
      email
      follows {
        _id
        username
        email
        posts {
          _id
          recipeId
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment ($postId:ID!, $commentText:String!){
    addComment(postId:$postId, commentText:$commentText){
      username
      recipeId
      comments {
        commentId
        commentText
        username
      }
    }
  }
`;
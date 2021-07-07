import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me{
      _id
      username
      email
      follows {
        username
        email
        posts {
          recipeId
        }
      }
      posts {
        recipeId
        comments {
          username
          commentText
        }
        createdAt
      }
    }
  }
`;
import React from "react";
import {
  Grid,
  Image,
  Header,
  List,
  Rating,
  Icon,
  Button,
} from "semantic-ui-react";
import { GET_POSTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Post from '../Post'

function Posts() {
  const { data: { getAllPosts: posts } } = useQuery(GET_POSTS);
  console.log(posts)
  // const { loading, error, data } = useQuery(GET_SINGLE_POST, {
  //   variables: { postId }
  // })


  return (
    <>
    {
    posts?.map(post => <Post post={post}/>)
    }
    </>
  );
}

export default Posts;
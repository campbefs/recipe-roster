import React, { useState } from "react";
import {
  Grid,
  Image,
  Header,
  List,
  Rating,
  Icon,
  Button
} from "semantic-ui-react";
import Comments from '../Comments'
import hat from "../../assets/images/chefhat.jpeg";
import "./post.css";
// import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_POST } from '../../utils/queries'

const Post = (props) => {
  const { id: getSinglePostPostId} = useParams();
  const { loading, data } = useQuery(GET_SINGLE_POST, {
    variables: { id: getSinglePostPostId }
  });

  const post = data?.getSinglePost || {};

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="container">
        <div className="postGrid">
          <Grid stackable divided>
            <Grid.Row  columns={2}>
              <Grid.Column>
                <Image src={getSinglePost.image} />
              </Grid.Column>
              <Grid.Column className='rightColumn'>
                <Header dividing>
                  <List horizontal>
                    <List.Item>
                      <Rating
                        maxRating={5}
                        clearable
                        // onRate={() => {
                        //     setRate(e.target.value)
                        // }}
                      />
                    </List.Item>
                    <List.Item>
                      <Icon name="heart outline" />
                      10
                    </List.Item>
                    <List.Item>
                      <Icon name="add" />
                    </List.Item>
                  </List>
                </Header>
                <h1>{getSinglePost.label}</h1>
                <h2>Ingredients</h2>
                <List bulleted items={getSinglePost.ingredientLines} />
                <Comments/>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
      </div>
    </>
  );
}

export default Post;

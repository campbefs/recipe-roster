import React from "react";
import {
  Segment,
  Grid,
  Image,
  List,
} from "semantic-ui-react";
import avatar from '../../assets/images/square-image.png'
import "./home.css";
import { useQuery, useMutation } from '@apollo/client'
import { GET_ME, MY_FEED } from '../../utils/queries';


function Home() {
  // QUERY FEED
  const { loading: loading1, data: feed } = useQuery(MY_FEED);
  let feedData = feed?.myFeed || {};
  
  const { loading: loading2, data: follow } = useQuery(GET_ME);
  let followData = follow?.me || {};

  console.log(followData.follows);

  // Loading - must come at bottom
  if (loading1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="home">
       
        <Grid divided stackable>
        
        <div className='posts'>
        <Segment>
          <Grid.Row>
            <div className="homeHeader">
              <h2>What's on the menu today?</h2>
            </div>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              {feedData.map((post) => {
                return (
                  <>
                    <h3 className='title'>{post.recipe.label}</h3>
                    <p>{post.username}</p>
                    <Image className='img' src={post.recipe.image} />
                  </>
                );
              })}
            </Grid.Column>
          
          </Grid.Row>
         
          </Segment>
          </div>
          <div className='following'>
            <Segment>
          <Grid.Row>
            <h3 style={{marginBottom: "20px"}}>Following</h3>
            </Grid.Row>
            <Grid.Row>
              <List vertical>
                {
                  followData.follows.map((follows) => {
                    return (
                      <List.Item>
                      <div style={{marginBottom: "15px"}}>
                        <Image
                          src={avatar}
                          avatar
                        />
                        <span>{follows.username}</span>
                      </div>
                    </List.Item>
                    )
                  })
                }
              </List>
          
          </Grid.Row>
          </Segment>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default Home;

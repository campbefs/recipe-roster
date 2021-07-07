import React, { useState } from "react";
import {
  Segment,
  Grid,
  Image,
  Input,
  Header,
  Button,
  List,
} from "semantic-ui-react";
import hat from "../../assets/images/chefhat.jpeg";
import avatar from '../../assets/images/square-image.png'
import "./home.css";
import { gql } from '@apollo/client'


function Home() {
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
              <h3 className='title'>Title</h3>
              <Image className='img' src={hat} />
              <h3 className='title'>Title</h3>
              <Image className='img' src={hat} />
              <h3 className='title'>Title</h3>
              <Image className='img' src={hat} />
            </Grid.Column>
          
          </Grid.Row>
         
          </Segment>
          </div>
          <div className='following'>
            <Segment>
          <Grid.Row>
            <h3>Following</h3>
            </Grid.Row>
            <Grid.Row>
              <List horizontal>
                <List.Item>
                  <div>
                    <Image
                      src={avatar}
                      avatar
                    />
                    <span>Username</span>
                  </div>
                </List.Item>
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

import React, { useState, useEffect } from "react";
import { Segment, Grid, Image, List, Card } from "semantic-ui-react";
// import hat from "../../assets/images/chefhat.jpeg";
import avatar from "../../assets/images/square-image.png";
import "./home.css";
import { useQuery } from "@apollo/client";
import { MY_FEED, GET_ME_PROFILE } from "../../utils/queries";
import UserSearch from "../UserSearch";
import { searchUser } from "../../utils/API";
// import { Link } from 'react-router-dom';

function Home() {
  // QUERY FEED
  const { loading: loading2, data: follow } = useQuery(GET_ME_PROFILE, {
    fetchPolicy: "no-cache",
  });
  const { loading: loading1, data: feed } = useQuery(MY_FEED);
  let feedData = feed?.myFeed || {};
  let followData = follow?.me || {};

  // console.log(follow);

  // Loading - must come at bottom
  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  console.log(followData)
  return (
    <>
      <div className="home">
        <Grid divided stackable>
          <div className="posts">
            <Grid.Row>
              <div className="homeHeader">
                <h2 className='header'>Hey {followData.username}, what's on the menu today?</h2>
              </div>
            </Grid.Row>

            <List horizontal>
              {feedData.map((post) => {
                return (
                  <List.Item>
                    <Card style={{ marginBottom: "50px" }}>
                      <div className="title">
                        <a
                          className="click"
                          className="hover-link"
                          onClick={() => {
                            window.location.href = `/post/${post._id}`;
                          }}
                        >
                          <h3 style={{ marginBottom: "8px" }}>
                            {post.recipe.label}
                          </h3>
                        </a>
                        <p>
                          <a
                            className="hover-link"
                            style={{ fontWeight: "bold" }}
                            onClick={() => {
                              window.location.href = `/profile/${post.username}`;
                            }}
                          >
                            {post.username}
                          </a>{" "}
                          posted{" "}
                          <span
                            style={{
                              fontWeight: "normal",
                              right: "15px",
                            }}
                          >
                            {post.createdAt}
                          </span>
                        </p>

                        <a
                          className="hover-link"
                          onClick={() => {
                            window.location.href = `/post/${post._id}`;
                          }}
                        >
                          <Image
                            className="img"
                            src={post.recipe.image}
                            style={{ marginTop: "20px" }}
                          />
                        </a>
                      </div>
                    </Card>
                  </List.Item>
                );
              })}
            </List>
          </div>
        </Grid>
        <div className='follow'>
        <Grid>
          <div className="following">
           
            <UserSearch />
           
            <Segment>
              <Grid.Row>
                <div className="follow-header">
                  <h3>Following</h3>
                </div>
              </Grid.Row>

              <Grid.Row>
                <div className="following">
                  <List style={{ "text-align": "left" }}vertical>
                    {followData.follows.map((follows) => {
                      return (
                        <List.Item>
                          <div
                            className="hover-link"
                            style={{
                              marginBottom: "15px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              window.location.href = `/profile/${follows.username}`;
                            }}
                          >
                            <Image src={avatar} avatar />
                            <a
                              className="hover-link"
                              style={{ marginLeft: "5px" }}
                            >
                              {follows.username}
                            </a>
                          </div>
                        </List.Item>
                      );
                    })}
                  </List>
                </div>
              </Grid.Row>
            </Segment>
          </div>
        </Grid>
        </div>
      </div>
    </>
  );
}

export default Home;

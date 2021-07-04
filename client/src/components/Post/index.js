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


function Post() {
  const ingredients = [
    "1/2 cup shredded cheese",
    "8oz elbow pasta",
    "1 cup milk",
    "1/2 yellow onion",
    "1/2 teaspoon paprika",
    "1 teaspoon salt",
    "3/4 teaspoon pepper",
    "1/4 cup of unsalted butter",
  ];

  return (
    <>
      <div className="container">
        <div className="postGrid">
          <Grid stackable divided>
            <Grid.Row  columns={2}>
              <Grid.Column>
                <Image src={hat} />
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
                <h1>Post Title Goes Here</h1>
                <h2>Ingredients</h2>
                <List bulleted items={ingredients} />
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

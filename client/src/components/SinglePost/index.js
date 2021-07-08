import React  from "react";
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
import "./post.css";
// import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_POST } from '../../utils/queries'

const SinglePost = () => {
  // const { id: postId } = useParams();

  const { loading, error, data } = useQuery(GET_SINGLE_POST);

  if (loading) return 'Loading...'
  if (error) return 'Oops! Something went wrong...'

  // const post = data?.post || {};
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="container">
        <div className="postGrid">
          <Grid stackable divided>
            <Grid.Row  columns={2}>
              <Grid.Column>
                <Image src={data.image} />
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
                <h1>{data.label}</h1>
                <h2>Ingredients</h2>
                <List bulleted items={data.ingredientLines} />
                <p><a href={data.url}>Click here</a> to try this recipe now.</p>
                <Comments/>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
      </div>
    </>
  );
}

export default SinglePost;

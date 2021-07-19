import {
  Segment,
  Grid,
  Image,
  List,
  Card,
  Icon,
  Button,
  Modal,
} from "semantic-ui-react";
import "../Home/home.css";
import { useQuery, useMutation } from "@apollo/client";
import {
  USER_PROFILE,
  GET_SINGLE_USER_PROFILE
} from "../../utils/queries";
import { useParams } from "react-router-dom";
import { ADD_FOLLOW } from "../../utils/mutations";
import React from "react";

function UserProfile() {
  const [open, setOpen] = React.useState(false);
  const [addFollow] = useMutation(ADD_FOLLOW);

  // QUERY FEED
  const { username } = useParams();

  const { loading: loading1, data: follow } = useQuery(
    GET_SINGLE_USER_PROFILE,
    {
      variables: { username: username }, // CHANGE THIS!!!
      fetchPolicy: "no-cache",
    }
  );
  let followData = follow?.getSingleUser || {};
  console.log(followData, follow);

  const { loading: loading2, data: feed, refetch } = useQuery(USER_PROFILE, {
    variables: { username: username }, // CHANGE THIS!!!
    fetchPolicy: "no-cache",
  });
  let feedData = feed?.userProfile || {};

  // console.log('feedData', feedData);
  // console.log("follow data:", followData);

  // Loading - must come at bottom
  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      await addFollow({
        variables: { followId: followData._id },
      });
      // console.log('I was clicked')
      alert(`You are now following ${followData.username}!`);
      
    } catch (err) {
      console.error(err);
    }
  };
  console.log(username);
  console.log(followData);
  return (
    <>
      <div className="home">
        <Grid divided stackable>
          <div className="posts">
            <Grid.Row>
              <div className="homeHeader">
                <h2>
                  <Icon name="user circle" />
                  {username}'s Favorite Recipes
                </h2>
                <div className="following">
                  <Modal
                    closeIcon
                    open={open}
                    trigger={<a className="follow-list">Following</a>}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    size="mini"
                  >
                    <Modal.Content>
                      <h3 style={{ textAlign: "center" }}>Following</h3>
                      <List vertical="true">
                        {followData.follows.map((follows) => {
                          return (
                            <List.Item key={follows.id}>
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
                                <Icon name="user circle" />
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
                    </Modal.Content>
                  </Modal>
                  
                  <div className="follow-btn">
                    <Button 
                    onClick={handleClick}
                    primary size="small" compact>
                      <Icon name="add" /> Follow
                    </Button>
                  </div>


                </div>
              </div>
            </Grid.Row>
            <Grid.Row columns={3}>
              <List horizontal>
                {feedData.map((post) => {
                  return (
                    <List.Item key={post.id}>
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

                          <p>{post.createdAt}</p>

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
            </Grid.Row>
          </div>
          <div className="following"></div>
        </Grid>
      </div>
    </>
  );
}

export default UserProfile;

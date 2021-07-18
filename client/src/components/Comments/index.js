import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'
import { ADD_COMMENT, DELETE_COMMENT } from '../../utils/mutations'
import { GET_SINGLE_POST } from '../../utils/queries'
import { useParams } from 'react-router-dom';



function Comments() {
console.log("refreshPage");
  const [commentData, setCommentData] = useState({ comment: '' });
  const [oldCommentsData, setOldCommentsData] = useState({ oldComments: []});
  const { postId } = useParams();
  const { data, refetch, loading } = useQuery(GET_SINGLE_POST,
    {
      variables: { postId },
      fetchPolicy: "no-cache"
    });
  if (data && oldCommentsData.oldComments && (oldCommentsData.oldComments.length < 1 || data.getSinglePost.comments.length == oldCommentsData.oldComments.length +1 ) ){
    console.log(data.getSinglePost.comments);
    setOldCommentsData({ oldComments: data.getSinglePost.comments });
  }
  

  const handleCommentChange = (event) => {
    setCommentData({ comment: event.target.value });
  };


  const [addComment] = useMutation(ADD_COMMENT);
  const handleAddComment = async (event) => {
    try {
      await addComment({
        variables: { postId, commentText: commentData.comment }
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
    setCommentData({
      comment: ''
    });
  };



  if (!oldCommentsData || !oldCommentsData.oldComments ) {
    return <div>Loading...</div>;
  }
  return (
    <Comment.Group minimal>
      <Header as='h3' dividing>
        Comments
      </Header>

      <Segment>
        {
          oldCommentsData.oldComments.map((comment) => {
            return (
              <div key={comment.commentId} style={{"marginBottom": "10px"}}>{comment.commentText}</div>
              // <Comment>
              //   <Comment.Content>
              //     <Comment.Author as='a'></Comment.Author>
              //     <Comment.Metadata>
              //       <span><p></p></span>
              //     </Comment.Metadata>
              //     <Comment.Text></Comment.Text>
              //     <Comment.Actions>
              //       <a>Reply</a>
              //     </Comment.Actions>
              //   </Comment.Content>
              // </Comment>
            );
          })
        }
      </Segment>
      <Form>
        <Form.Field>
          <input
            type='text'
            placeholder='Add a comment'
            name='comment'
            onChange={handleCommentChange}
            value={commentData.comment}
            required
          />
        </Form.Field>
        <Button
          content='Add Reply'
          labelPosition='left'
          onClick={handleAddComment}
          icon='edit'
          primary />
      </Form>
    </Comment.Group>
  );
}

export default Comments;


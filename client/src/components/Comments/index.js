import React, { useState } from 'react'
import { Comment, Header } from 'semantic-ui-react'
import AddComment from '../AddComment '

function Comments({ comments }) {

    return (
        <Comment.Group minimal>
        <Header as='h3' dividing>
          Comments
        </Header>
        {comments &&
          comments.map(comment => (
            <Comment key={comment.commentId}>
            <Comment.Avatar as='a' icon='user circle' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.username}</Comment.Author>
              <Comment.Metadata>
                <span>{comment.createdAt}</span>
              </Comment.Metadata>
              <Comment.Text>{comment.commentText}</Comment.Text>
            </Comment.Content>
          </Comment>
          ))};
        <AddComment/>
      </Comment.Group>
    );
}

    export default Comments


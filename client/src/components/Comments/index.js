import React, { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

function Comments() {
  const [commentText, setCommentText] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText },
      });
      setCommentText("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Comment.Group minimal>
      <Header as="h3" dividing>
        Comments
      </Header>

      <Comment>
        <Comment.Avatar
          as="a"
          src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
        />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Form reply onSubmit={handleFormSubmit}>
        <Form.TextArea
          placeholder="Write your comment here..."
          value={commentText}
          input="text"
          name="textAreaInput"
          onChange={handleChange}
        />
        <Button
          type="submit"
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          basic
        />
      </Form>
    </Comment.Group>
  );
}

export default Comments;

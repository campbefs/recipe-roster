import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import {
  GET_ME,
  GET_SINGLE_POST,
} from "../../utils/queries";

function AddComment({ postId }) {
  const [commentText, setCommentText] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);


  const handleChange = (event) => {
      setCommentText(event.target.value);
    
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText, postId },
      });
      setCommentText("");
    } catch (e) {
      console.error(e);
    }

    return (
      <Form reply
      onSubmit={handleFormSubmit}
      >
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

    );
  };
}

export default AddComment;

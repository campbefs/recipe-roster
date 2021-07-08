import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import {
  GET_ME,
  GET_SINGLE_POST,
  GET_SINGLE_RECIPE,
} from "../../utils/queries";

function AddComment() {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({
          query: GET_SINGLE_POST.comments,
        });
        cache.writeQuery({
          query: QUERY_SINGLE_POST.comments,
          data: { comments: [addComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: { ...me, comments: [...me.comments, addComment] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 300) {
      setCommentText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText },
      });
      setCommentText("");
      setCharacterCount(0);
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

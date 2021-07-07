import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import '../Login/login.css'


function SignUp() {
  return (
    <div className='loginForm' >
    <Segment compact padded>
      <Form>
        <h1>Become a Recipe Roster member today!</h1>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Enter username" />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Enter email address" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Enter password" />
        </Form.Field>

        <Button type="submit"
        // onClick={() => {
          
        // }}
        >Submit</Button>
        <Button>Already a member? Login here. </Button>
      </Form>
    </Segment>
    </div>
  );
}

export default SignUp;

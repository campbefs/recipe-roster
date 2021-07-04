import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import './login.css'


function Login() {
  return (
    <div className='loginForm' >
    <Segment compact padded>
      <Form>
        <h1>Welcome Back!</h1>
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
      </Form>
    </Segment>
    </div>
  );
}

export default Login;
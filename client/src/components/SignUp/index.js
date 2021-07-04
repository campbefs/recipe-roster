import React from "react";
import { Link } from 'react-router-dom'
import { Button, Form, Segment } from "semantic-ui-react";
import '../Login/login.css'


function SignUp() {
  return (
    <div className='loginForm' >
    <Segment compact padded>
      <Form>
        <h1>Become a Recipe Roster member today!</h1>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Enter email address" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Enter password" />
        </Form.Field>
        <Form.Field>
          <label>Verify Password</label>
          <input placeholder="Re-enter password" />
        </Form.Field>
        <Button type="submit"
        // onClick={() => {
          
        // }}
        >Submit</Button>
        <p>Already a member? <Link to='/login'>Login here.</Link></p>
      </Form>
    </Segment>
    </div>
  );
}

export default SignUp;

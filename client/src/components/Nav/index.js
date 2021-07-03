import React from "react";
// import { Link } from 'react-router-dom';
import "./nav.css";
import { Header, Icon, Segment } from "semantic-ui-react";


function Nav() {
  return (
    <Segment basic>
      <Header as="h2" floated='left' className='header flex-row px-1'>
        <Icon name='food'/>
        Recipe Roster
      </Header>
      <Header as='h3' floated='right'>Sign Up</Header>
      <Header as='h3' floated='right'>Login</Header>
      </Segment>
  );
}

export default Nav;

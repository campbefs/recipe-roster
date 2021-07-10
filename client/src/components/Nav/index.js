import React, { useState } from "react";
import "./nav.css";
import { Header, Icon, Segment, Dropdown, Button } from "semantic-ui-react";


function Nav(props) {
  return (
    <Segment basic>
      <Header as="h2" floated="left" className="header flex-row px-1">
        <Icon name="food" />
        <span className="hover-link" onClick={() => window.location.href = "/home"}>Recipe Roster</span>
      </Header>

      <Header as="h3" floated="right">
        <Button onClick={() => window.location.href = "/login" } >
          Login</Button>
        <Button onClick={() => window.location.href = "/signup" } >
          Sign Up</Button>
      </Header>

      <Header as="h3" floated="right">
      <Dropdown icon='dropdown'>
    <Dropdown.Menu>
    <Dropdown.Item text='Search Recipes' onClick={() => window.location.href = "/searchrecipes" } />
      <Dropdown.Item text='Go Home' onClick={() => window.location.href = "/home" } />
      <Dropdown.Item text='My Profile' onClick={() => window.location.href = "/myprofile" } />
      {/* <Dropdown.Item text='Liked Recipes' onClick={() => window.location.href = "/likedpost" } /> */}
      
      <Dropdown.Divider/>
      <Dropdown.Item text='Logout' onClick={() => window.location.href = "/" } />
      
     </Dropdown.Menu>
  </Dropdown>
      </Header>

    </Segment>
  );
}

export default Nav;

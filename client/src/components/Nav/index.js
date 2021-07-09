import React, { useState } from "react";
import "./nav.css";
import { Header, Icon, Segment, Dropdown, Button } from "semantic-ui-react";


function Nav(props) {
  return (
    <Segment basic>
      <Header as="h2" floated="left" className="header flex-row px-1">
        <Icon name="food" />
        Recipe Roster
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
<<<<<<< HEAD
      <Dropdown.Item text='Go Home' onClick={() => window.location.href = "/home" } />
      <Dropdown.Item text='View Profile' onClick={() => window.location.href = "/profile" } />
      <Dropdown.Item text='Liked Recipes' onClick={() => window.location.href = "/likedpost" } />
=======
      <Dropdown.Item text='Search Recipes' onClick={() => props.setPage(props.pages[6])} />
      <Dropdown.Item text='Go Home' onClick={() => props.setPage(props.pages[1])} />
      <Dropdown.Item text='View Profile' onClick={() => props.setPage(props.pages[2])} />
      <Dropdown.Item text='Liked Recipes' onClick={() => props.setPage(props.pages[3])}  />
      <Dropdown.Item text='View Posts' onClick={() => props.setPage(props.pages[7])}  />
>>>>>>> b59749e75d82bf2163f3c05759019079cb533fa2
      <Dropdown.Divider/>
      <Dropdown.Item text='Logout' onClick={() => window.location.href = "/" } />
      
     </Dropdown.Menu>
  </Dropdown>
      </Header>

    </Segment>
  );
}

export default Nav;

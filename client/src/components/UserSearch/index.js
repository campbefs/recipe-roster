import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

function UserSearch() {
  // state for search users input
  const [searchTerm, setSearchTerm] = useState("");
 
  return (
    <>
      <Grid.Row>
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search users..."
              className="prompt"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <a
            href={'/profile/' + searchTerm}>
            <i className="search icon" />
            </a>
          </div>
        </div>
      </Grid.Row>
    </>
  );
}


export default UserSearch;

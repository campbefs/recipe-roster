// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input, Button, Card, List } from "semantic-ui-react";


function RecipeSearch() {
  const [recipes, setRecipes] = useState({});
  const [query, setQuery] = useState("");
  const [queryFromButtonClick, setQueryFromButtonClick] = useState("")

    const handleClick = () => {
        setQueryFromButtonClick(query)
    }

  // useEffect(() => 
  //   axios.get(`https://api.edamam.com/search?app_id=65eb38bf&app_key=7ba37096f7d35dd3b5bd8c65c2dfe698&q=${queryFromButtonClick}`)
  //       .then((res) => {
  //         console.log(res)
  //         setRecipes(res.data)}), [queryFromButtonClick])
  

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for recipes... "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button circular compact type='button' icon="search" 
      onClick={handleClick}
      />

      {/* Mapping through recipe data to display cards */}
  
      <ul>
        {/* {recipes.map((recipe) => (
          <li key={recipe.uri}>{recipe.label}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default RecipeSearch;

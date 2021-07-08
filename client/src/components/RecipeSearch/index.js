import { searchRecipes } from "../../utils/API";
import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Card,
  Image,
  Segment,
} from "semantic-ui-react";

const RecipeSearch = () => {
  // state for holding returned recipe api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // state to hold saved recipeId values
  // const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipes());

  // method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRecipes(searchInput);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
     
      const { hits } = await response.json();
      
      const recipeData = []
      for (let i=0; i<hits.length; i++) {
        let uri = hits[i].recipe.uri;
        let image = hits[i].recipe.image;
        let label = hits[i].recipe.label;
        let ingredientLines = hits[i].recipe.ingredientLines;
        recipeData.push({uri, image, label, ingredientLines});
      };
      console.log(recipeData)

    //   const recipeData = hits.map(() => ({
    //     recipeId: recipe.uri,
    //     image: recipe.image,
    //     title: recipe.label,
    //     ingredients: recipe.ingredients.text,
    //     url: recipe.url,
    //   }));
      
      setSearchedRecipes(recipeData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <h1>Search for Recipes!</h1>
        <form onSubmit={handleFormSubmit} >
            <input
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search for recipes... "
            />
            <Button type="submit" variant="success">
              Search
            </Button>
        
        </form>
      </Container>

      <Segment>
        <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : `Search for a recipe to get cookin'!`}
        </h2>
        {searchedRecipes.map((recipeData) => {
          return (
            <Card key={recipeData.uri}>
              <Card.Content>
                <Card.Header>{recipeData.label}</Card.Header>
                <Image
                  src={recipeData.image}
                  alt={`Image of ${recipeData.label} finished product`}
                />
              </Card.Content>
            </Card>
          );
        })}
      </Segment>
    </>
  );
};

export default RecipeSearch;

//  return <reactStuff />;

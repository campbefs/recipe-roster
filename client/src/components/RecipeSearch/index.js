import { searchRecipes } from "../../utils/API";
import React, { useState, useEffect } from "react";
import { Form, Container, Button, Card, Image, Segment } from "semantic-ui-react";

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

      const { items } = await response.json();

      const recipeData = items.map((recipe) => ({
        recipeId: recipe.uri,
        image: recipe.image,
        title: recipe.label,
        ingredients: recipe.ingredients.text,
        url: recipe.url,
      }));
     
      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


return (
  <>
    <Container>
      <h1>Search for Recipes!</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search for recipes... "
          />
        </Form.Field>
        <Button 
        type="submit"
        variant="success"
        >
          Search
        </Button>
      </Form>
    </Container>

    <Segment>
      <h2>
        {searchedRecipes.length
          ? `Viewing ${searchedRecipes.length} results:`
          : `Search for a recipe to get cookin'!`}
      </h2>
        {searchedRecipes.map((recipe) => {
            return (
      <Card key={recipe.uri}>
        <Card.Content>
          <Card.Header>{recipe.label}</Card.Header>
          <Image src={recipe.image} alt={`Image of ${recipe.label} finished product`}/>
        </Card.Content>
        </Card>
            );
        })}
    </Segment>
  </>
  
)};

export default RecipeSearch;

//  return <reactStuff />;

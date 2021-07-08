import { searchRecipes } from "../../utils/API";
import React, { useState, useEffect } from "react";
import {
  Form,
  List,
  Icon,
  Button,
  Card,
  Image,
  Segment,
  Grid,
  Input,
} from "semantic-ui-react";
import "./search.css";

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

      const recipeData = [];
      for (let i = 0; i < hits.length; i++) {
        let uri = hits[i].recipe.uri;
        let image = hits[i].recipe.image;
        let label = hits[i].recipe.label;
        let ingredientLines = hits[i].recipe.ingredientLines;
        recipeData.push({ uri, image, label, ingredientLines });
      }
      console.log(recipeData);

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
      <Grid className="searchPage">
        <Grid.Row>
          <h1>Let's get cookin'!</h1>
        </Grid.Row>
        <Grid.Row className="searchInput">
          <Form onSubmit={handleFormSubmit}>
            <Input
              className="input"
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search recipes... "
            />
            <Button  basic type="submit" variant="success" icon="search" circular />
         
          </Form>
        </Grid.Row>

        <Grid.Row className="searchedRecipes">
        <Segment>
        
            <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : `Recipes will appear here... `}
        </h2>
        
            {searchedRecipes.map((recipeData) => {
              return (
               
                  <Card key={recipeData.uri}>
                    <Card.Content>
                    <Card.Header centered>
                    <List horizontal>
                    <List.Item>
                    {recipeData.label}
                    </List.Item>
                    <List.Item>
                    <Icon name="heart outline" />
                    </List.Item>
                    <List.Item>
                    <Icon name="list" />
                    </List.Item>
                  </List>
                        
                    
                    </Card.Header>
                      <Image
                        src={recipeData.image}
                        alt={`Image of ${recipeData.label} finished product`}
                      />
                    </Card.Content>
                  </Card>
                  
                
              );
            })}
            </Segment>
          
        </Grid.Row>
      </Grid>
    </>
  );
};

export default RecipeSearch;

//  return <reactStuff />;

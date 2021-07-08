// import React from "react";
// import RecipeSearch from "../RecipeSearch";
// import {
//   ADD_RECIPE_AND_POST,
//   CREATE_POST,
//   ADD_RECIPE,
// } from "../../utils/mutations";
// import { GET_ME } from "../../utils/queries";
// import { useMutation, useQuery } from "@apollo/client";

// const AddRecipeAndPost = ({ recipeData }) => {
//   const [addRecipe] = useMutation(ADD_RECIPE, {
//     update(cache, { data: { addRecipe } }) {
//       try {
//         // update user's post array
//         const { recipes } = cache.readQuery({ query: GET_ME });
//         cache.writeQuery({
//           query: GET_ME,
//           data: { posts: [addRecipe, ...posts] },
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     },
//   });

//   return <div></div>;
// };

// export default AddRecipeAndPost;

// import { useMutation } from "@apollo/client";
// import { CREATE_POST } from "../../utils/mutations";
// import { GET_SINGLE_RECIPE } from "../../utils/queries";



// function CreatePost() {
//   const [recipeData, setRecipeData] = useState({
//     label: recipe.label,
//     image: recipe.image,
//     ingredientLines: recipe.ingredientLines,
//     url: recipe.url,
//   });
//   // const { loading, error, data}  = useQuery(GET_SINGLE_RECIPE, {
//   //     variables: { label, image, ingredientLines, url },
//   // });
//   const [createPost] = useMutation(CREATE_POST, {
//     update(cache, { data: { createPost } }) {
//       try {
//         cache.writeQuery({
//           query: GET_ME,
//           data: { posts: [createPost, ...posts] },
//         });
//       } catch (e) {
//         console.error(e);
//       }
//       // cache.modify({
//       //     fields: {
//       //         posts(existingPosts = []) {
//       //             const newPostRef = cache.writeFragment({
//       //                 data: createPost,
//       //                 fragment: gql`
//       //                 fragment NewPost on Posts {
//       //                     recipe {
//       //                         _id
//       //                     }
//       //                 }
//       //                 `
//       //             });
//       //             return [...existingPosts, newPostRef]
//       //         }
//       //     }
//       // })
//     },
//   });

//   return <SinglePost />;
// }

// export default CreatePost;

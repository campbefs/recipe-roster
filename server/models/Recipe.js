const { Schema, model } = require('mongoose');

// columns from API
// https://api.edamam.com/search?app_id=65eb38bf&app_key=7ba37096f7d35dd3b5bd8c65c2dfe698&q=lamb
/*
uri: String // lookup
label: String
image: String
source: String
url: String
shareAs: String
yield: 8   //
dietLabels: [String]  // array
ingredientLines: [String]
calories: float??
cuisineType: [String]
mealType: [String]
dishType: [String]
*/

const recipeSchema = new Schema({
  uri: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  source: {
    type: String,
  },
  url: {
    type: String,
  },
  shareAs: {
    type: String,
  },
  yield: {
    type: Number,
  },
  calories: {
    type: Number
  },
  dietLabels: {
    type: [String]
  },
  ingredientLines: {
    type: [String]
  },
  cuisineType: {
    type: [String]
  },
  mealType: {
    type: [String]
  },
  dishType: {
    type: [String]
  },
  ratings: {
    type: [Number]
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
  // SHOULD WE INCLUDE A BLOG SECTION HERE?
  // OR comments for the recipe itself?
},
// {
//   toJSON: {
//     virtuals: true,
//   }
// }
);

// recipeSchema.virtual('avgRating').get(function () {
//   sum = this.ratings.reduce((a, b) => a + b, 0);
//   if (this.ratings.length === 0) {
//     return 0;
//   } else {
//     return sum / this.ratings.length;
//   }
// });

// virtual - rating count
// recipeSchema.virtual('ratingCount').get(function () {
//   return this.ratings.length;
// });


const Recipe = model('Recipe', recipeSchema);


module.exports = Recipe;
const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  
    // postText: {
    //   type: String,
    //   required: [true, 'Text field is required'],
    //   min: 1,
    //   max: 280
    // },

    username: {
      type: String,
      required: [true, 'Username is required']
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
  toJSON: {
    virtuals: true,
  },
  // id: false
})

// virtual - post count
postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
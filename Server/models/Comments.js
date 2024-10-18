const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  userC: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  postC : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Post',
    required : true
  }
},{timestamps : true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
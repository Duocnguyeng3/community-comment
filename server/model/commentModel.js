const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'A comment must have a title'],
    trim: true,
    maxlength: [40, 'A title must have less or equal than 40 character'],
    minlength: [5, 'A title must have more or equal than 5 character'],
  },
  comment: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

const mongoose = require('mongoose');
// const IdentifiedUserSchema = new mongoose.Schema({
//   userId: mongoose.Types.ObjectId,
//   userName: String,
// });

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
  createdBy: {
    type: { userId: String, userName: String },
  },
  likedBy: {
    type: [{ userId: String, userName: String }],
  },
});

CommentSchema.pre('save', function (next) {
  this.likes = this.likedBy.length;
  next();
});
// CommentSchema.pre(/^find/, function (next) {
//   this.start = Date.now();
//   next();
// });
// CommentSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milisecond`); // "this" refer to query
//   next();
// });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

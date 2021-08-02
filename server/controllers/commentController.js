const { query } = require('express');
const fs = require('fs');
const Comment = require('../model/commentModel');
const commentsLocation = `${__dirname}/../../dev-data/data/comments.json`;
const dataComments = JSON.parse(fs.readFileSync(commentsLocation));
const AppError = require('../utils/AppError');

exports.getAllComment = async (req, res, next) => {
  try {
    // Filtering
    let { sort, fields, limit, page, ...query } = req.query;
    const queryString = JSON.stringify(query).replace(/\b(lt|lte|gt|gte)\b/, (match) => `$${match}`);
    query = JSON.parse(queryString);
    const queryObj = Comment.find(query);

    // sort
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      queryObj.sort(sortBy);
    } else {
      queryObj.sort({ likes: -1 });
    }

    // fields
    if (fields) {
      const selectFields = fields.split(',').join(' ');
      queryObj.select(selectFields);
    }
    // limit
    const limitResults = +limit || 20;
    const numPage = +page || 1;
    const skip = (numPage - 1) * limit;

    queryObj.skip(skip).limit(limitResults);

    const comments = await queryObj;

    res.status(200).json({
      status: 'success',
      data: {
        results: comments.length,
        comments,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createNewComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment) return next(new AppError("couldn't find comment with that ID", 404));
    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, { ...body }, { new: true, runValidators: true });

    if (!comment) return next(new AppError("couldn't find comment with that ID", 404));

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.reactComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reaction } = req.query;
    const { _id: userId, name: userName } = req.user;
    let comment;
    if (!id || !reaction)
      return next(new AppError('please provide id and type of reaction in your URL', 404));

    if (reaction === 'true') {
      comment = await Comment.findOneAndUpdate(
        { _id: id, 'likedBy.userId': { $ne: userId } },
        { $push: { likedBy: { userId, userName } } },
        { new: true }
      );
    } else if (reaction === 'false') {
      comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $pull: { likedBy: { userId } } },
        { new: true, runValidators: true }
      );
    }
    if (!comment)
      return next(new AppError("couldn't find comment with that ID/ you cannot like a post twice", 404));

    await comment.save();

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return next(new AppError("couldn't find comment with that ID", 404));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

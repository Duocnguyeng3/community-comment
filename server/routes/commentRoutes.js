const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(commentController.getAllComment)
  .post(authController.protect, commentController.createNewComment);
router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

router.route('/:id/react').patch(authController.protect, commentController.reactComment);
module.exports = router;

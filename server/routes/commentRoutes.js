const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/').get(commentController.getAllComment).post(commentController.createNewComment);
router.route('/:id').get(commentController.getComment).patch(commentController.updateComment);

module.exports = router;

const rateLimit = require('express-rate-limit');

limitHandler = (message) =>
  function (req, res, next) {
    res.status(429).json({
      message,
    });
  };

exports.limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000,
  message: 'Too many resquest form this IP, please try again in a hour',
});

exports.newCommentlimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  handler: limitHandler("You've created too many new comment, please try again in an hour"),
});
exports.newAccountlimiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  handler: limitHandler("You've created too many new account, please try again in an hour"),
});

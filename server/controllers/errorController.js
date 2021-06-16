const AppError = require('../utils/AppError');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
};

const handleCastError = (error, req) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 404);
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let productionError = { ...err, message: err.message };
    if (err.name === 'CastError') productionError = handleCastError(productionError, req);

    res.status(productionError.statusCode).json({
      status: productionError.status,
      message: productionError.message,
    });
  }
};

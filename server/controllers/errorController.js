const AppError = require('../utils/appError');
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
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate ${field} value: "${value}" . Please use another ${field}!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => new AppError(err.message, 400);
const handleJWTError = () => new AppError('Invalid token, please login again', 401);
const handleJWTExpireError = () => new AppError('Token has expired, please login again', 401);

const sendErrorProd = (err, res) => {
  // operatinal error, trusted error: send message to the client
  if (err.isOperation) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('Error 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, message: err.message };

    if (err.name === 'CastError') error = handleCastError(productionError, req);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpireError();
    sendErrorProd(error, res);
    res.status(productionError.statusCode).json({
      status: productionError.status,
      message: productionError.message,
    });
  }
};

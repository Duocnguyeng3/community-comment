const fs = require('fs');
const path = require('path');
const express = require('express');
const commentRouter = require('./routes/commentRoutes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// 1. MIDDLEWARE
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

// 2. ROUTER HANDLER
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(globalErrorHandler);

module.exports = app;

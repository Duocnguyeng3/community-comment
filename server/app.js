const fs = require('fs');
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const commentRouter = require('./routes/commentRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authController = require('./controllers/authController');

// 1. MIDDLEWARE
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'http://127.0.0.1:3000/*'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https://*.stripe.com',
          'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js',
        ],
        frameSrc: ["'self'", 'https://*.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many resquest form this IP, please try again in a hour',
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize()); // remove the $ sign in user input
app.use(xss());
app.use(express.static(path.resolve(__dirname, '../client/build')));

// 2. ROUTER HANDLER
// app.use(authController.isLoggedIn);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);

app.all('/api/v1/*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.all('*', (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(globalErrorHandler);

module.exports = app;

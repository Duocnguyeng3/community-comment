const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

function signToken(id) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

const createSendToken = catchAsync(async (user, statusCode, res) => {
  const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, passwordChangedAt } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next(new AppError('Please provide email and password', 404));

  const user = await User.findOne({ email }).select('+password');
  const checkPassword = await user.correctPassword(password, user.password);
  if (!user || !checkPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  await createSendToken(user, 200, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies?.jwt) {
    const decode = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    const currentUser = await User.findById(decode.id);
    if (!currentUser) return next();
    req.user = currentUser;
  }
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Getting token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError('You are not log in, please try again', 401));

  // 2. Verificatiom token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decode.id);
  if (!freshUser) return next(new AppError('The user belong to this token is no longer exist', 401));

  req.user = freshUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles: [admin, lead-guide] , user
    if (!roles.includes(req.user.role)) {
      next(new AppError('Your do not have permission to perfom this action', 403));
    }

    next();
  };

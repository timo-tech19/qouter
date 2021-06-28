const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const issueJWT = async (id) => {
    return await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

exports.authorizeUser = catchAsync(async (req, res, next) => {
    if (!req.user) {
        res.status(404).json({
            status: 'success',
            message: 'Something went wrong :(, please login again',
        });
    }

    res.status(200).json({
        status: 'success',
        data: req.user,
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { nameOrEmail, password } = req.body;
    const user = await User.findOne({
        $or: [{ userName: nameOrEmail }, { email: nameOrEmail }],
    }).select('-__v');

    let isCorrectPassword;
    if (user) {
        isCorrectPassword = await user.comparePassword(password);
    }

    if (!user || !isCorrectPassword) {
        return next(new AppError('Invalid Email or Password', 401));
    }

    req.user = user;

    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.password = undefined;
    const token = await issueJWT(user._id);
    res.status(200).json({
        status: 'success',
        data: { user, token },
    });
});

exports.register = catchAsync(async (req, res, next) => {
    const { firstName, lastName, userName, email, confirmPassword, password } =
        req.body;
    // check if user exists
    const conflictUser = await User.findOne({
        $or: [{ userName }, { email }],
    });

    if (conflictUser) {
        return next(new AppError('User Name or Email already exists', 400));
    }
    // store user in DB

    // hash password
    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashed,
    });

    // Remove password,timestamps from client data
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    // authenticate user
    const token = await issueJWT(user._id);
    // send info to client
    res.status(201).json({
        status: 'success',
        data: { user, token },
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    // Get token and check if it exists
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // else if (req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }

    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'You are not logged in!, Please login to get access',
        });
    }

    // Validate/Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const foundUser = await User.findById(decoded.id);
    if (!foundUser) {
        return next(new AppError('User not found', 404));
    }
    // Check if user changed password after token was issued
    // if (foundUser.changedPassword(decoded.iat)) {
    //     return res.status();
    // }

    // Grant access to user;
    req.user = foundUser;
    next();
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

const issueJWT = async (id) => {
    return await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

exports.login = async (req, res, next) => {
    const { nameOrEmail } = req.body;
    const user = await User.findOne({
        $or: [{ userName: nameOrEmail }, { email: nameOrEmail }],
    }).select('-__v');

    if (!user) {
        return res.status(404).json({
            status: 'failed',
            message: 'User account does not exist',
        });
    }

    user.createdAt = undefined;
    user.updatedAt = undefined;
    const token = await issueJWT(user._id);
    res.status(200).json({
        status: 'success',
        data: { user, token },
    });
};

exports.register = async (req, res, next) => {
    const {
        firstName,
        lastName,
        userName,
        email,
        confirmPassword,
        password,
    } = req.body;
    try {
        // check if user exists
        const conflictUser = await User.findOne({
            $or: [{ userName }, { email }],
        });

        if (conflictUser) {
            res.status(400).json({
                status: 'failed',
                message: 'User Name or Email already exists',
            });
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
        // authenticate user
        // send info to client
        user.password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        const token = await issueJWT(user._id);
        res.status(201).json({
            status: 'success',
            data: { user, token },
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error,
        });
    }
};

exports.protect = async (req, res, next) => {
    // Get token and check if it exists
    let token;
    try {
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
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        // Check if user still exists
        const foundUser = await User.findById(decoded.id);
        if (!foundUser) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found',
            });
        }
        // Check if user changed password after token was issued
        // if (foundUser.changedPassword(decoded.iat)) {
        //     return res.status();
        // }

        // Grant access to user;
        req.user = foundUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        });
    }
};

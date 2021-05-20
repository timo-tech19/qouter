// const Quote = require('../models/Quote');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = catchAsync(async (req, res, next) => {
    const { userName } = req.params;

    const user = await User.findOne({ userName }).select('-password');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: user,
    });
});

exports.followUser = catchAsync(async (req, res, next) => {
    // userId from param
    const { userId } = req.params;
    const { user } = req;

    // check and delete if user is already following
    const isFollowing = user.following && user.following.includes(userId);

    // add user id to following array
    const option = isFollowing ? '$pull' : '$addToSet';
    const updatedActiveUser = await User.findByIdAndUpdate(
        user._id,
        {
            [option]: { following: userId },
        },
        { new: true }
    );

    // update followed user followers array
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            [option]: { followers: user._id },
        },
        { new: true }
    );
    // send updated following to client
    res.status(200).json({
        status: 'sucess',
        data: { updatedUser, updatedActiveUser },
    });
});

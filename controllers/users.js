// const Quote = require('../models/Quote');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'front-end/public/images/users');
        },
        filename: (req, res, cb) => {
            cb(null, `user-${req.user.id}-${Date.now()}.jpeg`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(
                new AppError('not an image! please upload only images', 400),
                false
            );
        }
    },
});

exports.getUsers = catchAsync(async (req, res, next) => {
    const { term } = req.body;

    const users = await User.find({
        $or: [
            { userName: { $regex: term, $options: 'i' } },
            { firstName: { $regex: term, $options: 'i' } },
            { lastName: { $regex: term, $options: 'i' } },
        ],
    });

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users,
    });
});

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

exports.upload = upload.single('userPhoto');
exports.uploadPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new AppError('No image uploaded', 400));
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            photoUrl: `/images/users/${req.file.filename}`,
        },
        { new: true }
    );
    req.user = updatedUser;

    res.status(200).json({
        status: 'sucess',
        data: {
            photoUrl: updatedUser.photoUrl,
        },
    });

    // req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    // await sharp(req.file.buffer)
    //     .resize(500, 500)
    //     .toFormat('jpeg')
    //     .jpeg({ quality: 80 })
    //     .toFile(`public/img/users/${req.file.filename}`);
    // next();
});

exports.followUser = catchAsync(async (req, res, next) => {
    // userId from param
    const { userId } = req.params;
    const { user } = req;

    // check and delete if user is already following
    const isFollowing = user.following && user.following.includes(userId);

    // add user id to following array
    const option = isFollowing ? '$pull' : '$addToSet';
    const updatedCurrentUser = await User.findByIdAndUpdate(
        user._id,
        {
            [option]: { following: userId },
        },
        { new: true }
    );

    // update followed user followers array
    await User.findByIdAndUpdate(
        userId,
        {
            [option]: { followers: user._id },
        },
        { new: true }
    );
    // send updated following to client
    res.status(200).json({
        status: 'success',
        data: {
            following: updatedCurrentUser.following,
        },
    });
});

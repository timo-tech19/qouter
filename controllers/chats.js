const Chat = require('../models/Chat');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

exports.createChat = catchAsync(async (req, res, next) => {
    const { users } = req.body;

    if (!users) return next(new AppError('Users is no defined', 400));

    if (!users.length) return next(new AppError('No users in chat'), 400);

    users.push(req.user);

    const chat = await Chat.create({
        users,
        isGroupChat: true,
    });

    res.status(201).json({
        status: 'success',
        data: chat,
    });
});

exports.getChats = catchAsync(async (req, res, next) => {
    const { user } = req;

    // Find all chats user is a part of
    // Find all chats where users array includes current user
    const chats = await Chat.find({
        users: { $elemMatch: { $eq: user._id } },
    })
        .populate('users')
        .sort({ updatedAt: -1 });

    res.status(200).json({
        status: 'success',
        results: chats.length,
        data: chats,
    });
});

const getChatByUserId = (userId, username, otherUserId) => {
    return Chat.findOneAndUpdate(
        {
            isGroupChat: false,
            users: {
                $size: 2,
                $all: [
                    { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) } },
                    {
                        $elemMatch: {
                            $eq: mongoose.Types.ObjectId(otherUserId),
                        },
                    },
                ],
            },
        },
        {
            $setOnInsert: { name: username, users: [userId, otherUserId] },
        },
        { new: true, upsert: true }
    );
};

exports.getChat = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    let chat = await Chat.findOne({
        _id: id,
        users: { $elemMatch: { $eq: user._id } },
    }).populate('users');

    let foundUser;

    if (!chat) {
        // check is chat is requested using user id;
        foundUser = await User.findById(id);

        if (foundUser) {
            const username = `${user.firstName} ${user.lastName}`;
            chat = await getChatByUserId(
                user._id,
                username,
                user.foundUser._id
            );
        }
    }

    if (!chat) return next(new AppError('Chat not found', 400));

    res.status(200).json({
        status: 'success',
        data: chat,
    });
});

exports.updateChat = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        id,
        { name },
        { new: true }
    );

    if (!updatedChat) return next(new AppError('Update Chat failed', 400));

    res.status(200).json({
        status: 'success',
        data: updatedChat,
    });
});

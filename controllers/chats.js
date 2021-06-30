const Chat = require('../models/Chat');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
    const chats = await Chat.find({ users: { $elemMatch: { $eq: user._id } } });

    res.status(200).json({
        status: 'success',
        data: chats,
    });
});

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

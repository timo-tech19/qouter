const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Quote = require('../models/Quote');

exports.createComment = catchAsync(async (req, res, next) => {
    // get content from req.body
    const { content } = req.body;
    // get user from req
    const { user } = req;
    // get quote from req.params
    const { id } = req.params;
    // create comment
    const comment = await Comment.create({
        content,
        commentBy: user._id,
        commentOn: id,
    });

    const updatedQuote = await Quote.findByIdAndUpdate(
        id,
        {
            $addToSet: { comments: comment._id },
        },
        { new: true }
    )
        .populate('quotedBy')
        .populate('requoteData')
        .populate({
            path: 'requoteData',
            populate: { path: 'quotedBy' },
        });

    await comment.populate('commentBy').populate('commentOn').execPopulate();

    if (!comment) {
        return next(new AppError('Comment not created', 400));
    }
    // send comment to client
    res.status(201).json({
        status: 'success',
        data: updatedQuote,
    });
});

const Quote = require('../models/Quote');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.getQuotes = catchAsync(async (req, res, next) => {
    const quotes = await Quote.find()
        .select('-__v')
        .populate('quotedBy')
        .populate('requoteData')
        .populate({
            path: 'requoteData',
            populate: { path: 'quotedBy' },
        })
        .sort({ createdAt: -1 });

    if (!quotes) {
        res.status(404).json({
            status: 'failed',
            message: 'No qoutes found',
        });
    }

    res.status(200).json({
        status: 'success',
        results: quotes.length,
        data: quotes,
    });
});

exports.createQuote = catchAsync(async (req, res, next) => {
    const { content } = req.body;
    const quote = await Quote.create({ content, quotedBy: req.user._id });

    res.status(201).json({
        status: 'sucess',
        data: quote,
    });
});

exports.agreeWithQuote = catchAsync(async (req, res, next) => {
    // Get user from token
    const { user } = req;

    //get quoteId
    const { id } = req.params;
    // Check if quote has already been liked

    const isAgreed = user.agrees ? user.agrees.includes(id) : false;

    // Update User likes collection with quote id
    console.log(isAgreed, user.agrees);
    const option = isAgreed ? '$pull' : '$addToSet';
    await User.findByIdAndUpdate(
        user._id,
        {
            [option]: { agrees: id },
        },
        { new: true }
    );

    // Update quote likes collection with user id
    const updatedQuote = await Quote.findByIdAndUpdate(
        id,
        {
            [option]: { agrees: user._id },
        },
        { new: true }
    ).populate('quotedBy');

    // sent updated post to client
    res.status(200).json({
        status: 'success',
        data: updatedQuote,
    });
});

exports.requote = catchAsync(async (req, res, next) => {
    // A requote is a new quote with content from an already existing quote
    // Get user from token
    const { user } = req;

    //get quoteId
    const { id } = req.params;
    // Try to delete quote(Unrequote)
    // Find and delete the a requote by current user where original quote id matches the requoteId
    const deletedQuote = await Quote.findOneAndDelete({
        quotedBy: user._id,
        requoteData: id,
    });

    // Update User likes collection with quote id
    const option = deletedQuote ? '$pull' : '$addToSet';
    let requote;
    // Create a new quote(requote) if no quote was deleted
    if (!deletedQuote) {
        requote = await Quote.create({
            quotedBy: user._id,
            requoteData: id,
        });
    }

    // insert requote into user collection
    await User.findByIdAndUpdate(
        user._id,
        {
            [option]: { requotes: id },
        },
        { new: true }
    );

    const updatedQuote = await Quote.findByIdAndUpdate(
        id,
        {
            [option]: { requoters: user._id },
        },
        { new: true }
    )
        .populate('quotedBy')
        .populate('requoteData');

    res.status(201).json({
        status: 'success',
        data: updatedQuote,
    });
});

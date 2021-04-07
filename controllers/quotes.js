const Quote = require('../models/Quote');
const User = require('../models/User');

exports.getQuotes = async (req, res, next) => {
    try {
        const quotes = await Quote.find()
            .select('-__v')
            .populate('quotedBy')
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
        // const quotes = Quotes.f
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

exports.createQuote = async (req, res, next) => {
    const { content } = req.body;
    try {
        const quote = await Quote.create({ content, quotedBy: req.user._id });

        res.status(201).json({
            status: 'sucess',
            data: quote,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error,
        });
    }
};

exports.agreeWithQuote = async (req, res, next) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error,
        });
    }
};

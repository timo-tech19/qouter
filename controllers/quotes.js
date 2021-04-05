const Quote = require('../models/Quote');

exports.getQuotes = async (req, res, next) => {
    try {
        const quotes = await Quote.find()
            .select('-__v')
            .populate('postedBy')
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

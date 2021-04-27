const { Schema, model } = require('mongoose');

const quoteSchema = new Schema(
    {
        content: {
            type: String,
        },
        quotedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        agrees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        requoters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        requoteData: { type: Schema.Types.ObjectId, ref: 'Quote' },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

module.exports = model('Quote', quoteSchema);

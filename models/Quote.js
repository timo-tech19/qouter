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
    },
    { timestamps: true }
);

module.exports = model('Quote', quoteSchema);

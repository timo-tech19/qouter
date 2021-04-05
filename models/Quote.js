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
    },
    { timestamps: true }
);

module.exports = model('Quote', quoteSchema);

const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'A comment must have content'],
        },
        commentBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        commentOn: {
            type: Schema.Types.ObjectId,
            ref: 'Quote',
        },
    },
    { timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;

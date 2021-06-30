const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
    {
        name: {
            type: String,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true }
);

const Chat = model('Chat', chatSchema);
module.exports = Chat;

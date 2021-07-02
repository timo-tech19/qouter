const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Message must have content'],
        },
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
        readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Message = model('Message', messageSchema);

module.exports = Message;

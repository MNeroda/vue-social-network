const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    isGroup: Boolean,
    members: [
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            value: {
                type: String,
                required: true,
            },
            senderId: {
                type: Types.ObjectId,
                ref: 'User',
                required: true,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    lastMessage: {
        value: {
            type: String,
            default: '',
        },
        senderId: {
            type: Types.ObjectId,
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
});

module.exports = model('Conversation', schema);

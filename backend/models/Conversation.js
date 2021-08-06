const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    members: [
        {
            member: {
                type: Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    messages: [
        {
            value: {
                type: String,
            },
            senderId: {
                type: Types.ObjectId,
                ref: 'User',
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
            default: ''
        },
        senderId: {
            type: Types.ObjectId
        }
    }
});

module.exports = model('Conversation', schema)
const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: '',
    },

    conversationList: [
        {
            type: Types.ObjectId,
            ref: 'Conversation',
        },
    ],
    friendsList: [
        {
            type: Types.ObjectId,
            ref: 'User',
        },
    ],
    socketId: {
        type: String,
        default: null,
    },
    isHaveAvatar: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('User', schema);

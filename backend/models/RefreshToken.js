const { Schema, Types, model } = require('mongoose');

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    refreshToken: {
        type: String,
    },
    fingerPrint: {
        type: String,
    },
    expiresIn: {
        type: Number,
    },
});

module.exports = model('RefreshToken', schema);

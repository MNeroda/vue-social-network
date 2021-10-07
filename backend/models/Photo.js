const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    countLikes: {
        type: Number,
        default: 0
    },
    liked: [
        {
            type: Types.ObjectId,
        },
    ],
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Photo', schema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        uuid: {
            type: String,
            required: [true, 'uuid is required for user']
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required for user']
        }
    },
    {
        collection: 'user',
        timestamps: true
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;

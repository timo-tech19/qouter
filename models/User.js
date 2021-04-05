const bcrypt = require('bcryptjs');

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'User must have a first name'],
        },
        lastName: {
            type: String,
            required: [true, 'User must have a last name'],
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'User must have a user name'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'User must have an email'],
        },
        password: {
            type: String,
            required: [true, 'User must have a password'],
            select: false,
        },
        photoUrl: {
            type: String,
            default: '/images/users/default.png',
        },
    },
    { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);

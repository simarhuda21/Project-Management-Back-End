const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim: true
    // },

    password: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        required: true,
        default: 1
    },

    remainder: {
        type: Boolean,
        required: true,
        default: 0
    },

}, {
    timestamps: true,
    versionkey: false
});

UserSchema.statics.findByEmail = function(email) {
    return this.find(email);
};

let User = mongoose.model('users', UserSchema);

module.exports = User;
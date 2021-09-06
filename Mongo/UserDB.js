const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const HttpError = require('../error/HttpError')

const config = require('../config/config')

const saltRounds = 10;

// Connection URL
const url = config.db;

// Schema for our collection
const userScheme = new Schema({
    authId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    salt: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        required: false
    },
});


userScheme.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})


global.db = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(r => console.log('DB Connected'));





const UserDB = module.exports = mongoose.model("User", userScheme);

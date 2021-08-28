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
    // _id: {
    //     type: String
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    salt: {
        type: String,
    }
});

// userScheme.methods.encryptPassword = function (password) {
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//         return hash
//     });
// };

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

userScheme.statics.Authorize = (email, password, callback) => {
    UserDB.findOne({email: email}, (err, user) => {
            if(err) {
                throw err;
            }
            if(user){

                bcrypt.compare(password, user.password, (err, response) => {
                    if (err) return callback(new HttpError(404, 'Something went wrong' ), null)
                    if (!response) return callback(403, null)

                    return callback(null, user)
                })
            } else return callback(403, null)
        })
}



global.db = mongoose.connect(url, { // mongodb+srv://Sanchez:7539512Sanchez@cluster0.vgvcx.mongodb.net/WebApp
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(r => console.log('BD Connected'));





const UserDB = module.exports = mongoose.model("User", userScheme);

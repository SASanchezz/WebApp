const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const saltRounds = 10;

// Connection URL
const url = "mongodb://localhost:27017/mydb";

// Schema for our collection
const userScheme = new Schema({
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


userScheme.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};



mongoose.connect(url, { // mongodb+srv://Sanchez:7539512Sanchez@cluster0.vgvcx.mongodb.net/WebApp
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(r => console.log('BD Connected'));





module.exports = mongoose.model("User", userScheme);

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
    hashedPassword: {
        type: String
    },
    salt: {
        type: String,
    }
});

userScheme.methods.encryptPassword = function (password) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        return hash
    });

    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     if (err) throw err;
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         if (err) throw err;
    //
    //         console.log('hash in encrypt: '+hash);
    //         return hash;
    //     });
    // });
};

userScheme.virtual('password')
    .set(function (password)  {

        this._plainPassword = password
        this.salt = Math.random()+''
        this.hashedPassword = this.encryptPassword(password)
        console.log('hash in userSheme'+this.encryptPassword(password))
    })
    .get(function () {return this._plainPassword})


userScheme.methods.checkPassword = function (password) {

    return bcrypt.compare(password, this.hashedPassword);
};



mongoose.connect(url, { // mongodb+srv://Sanchez:7539512Sanchez@cluster0.vgvcx.mongodb.net/WebApp
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(r => console.log('BD Connected'));






module.exports = mongoose.model("User", userScheme);

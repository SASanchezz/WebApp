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
        unique: true
    },
    hashedPassword: {
        type: String
    },
    salt: {
        type: String,
        required: true
    }
});

userScheme.methods.comparePasswords = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};

userScheme.method('encryptPassword',  function (password) {
    // return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return err;
        bcrypt.hash(password, this.salt, function(err, hash) {
            if (err) return err;
            return hash;
        });
    });
});

userScheme.virtual('password')
    .set(function (password)  {
        this._plainPassword = password
        this.salt = Math.random()+'';
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function () {return this._plainPassword})



mongoose.connect(url, { // mongodb+srv://Sanchez:7539512Sanchez@cluster0.vgvcx.mongodb.net/WebApp
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(r => console.log('BD Connected'));


const UserModel = mongoose.model("User", userScheme);




function Save (Unit) {
    Unit.save(function(err){

        if(err) return console.log(err);
        console.log("Сохранен объект", Unit);
    });
}



module.exports = {UserModel, Save}

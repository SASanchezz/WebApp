const Menu = require('./Menu')
const Calculator = require('./Calculator')
const SignIn = require('./SignIn')
const Register = require('./Register')
const Users = require('./Users')
const SignOut = require('./SignOut')


const ErrorHandler = require('../Middleware/ErrorHandler')


global.Authorized = false;

module.exports = function(app) {
    app.use(Menu);
    app.use(Calculator);
    app.use(SignIn);
    app.use(SignOut);
    app.use(Users);
    app.use(Register);


    app.use(ErrorHandler)

}













const Menu = require('./Menu')
const Calculator = require('./Calculator')
const SignInOut = require('./SignInOut')
const Register = require('./Register')
const Users = require('./Users')

const ErrorHandler = require('../Middleware/ErrorHandler')


global.Authorized = false;

module.exports = function(app) {
    app.use(Menu);
    app.use(Calculator);
    app.use(SignInOut);
    app.use(Users);
    app.use(Register);


    app.use(ErrorHandler)

}













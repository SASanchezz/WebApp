const config = require('../../config/config')
const jwt = require("jsonwebtoken")
//Errors
const HttpError = require('../../error/HttpError')
const AuthError = require('../../error/AuthError')
//Interacting with DB
const UserDB = require("../../Mongo/UserDB")
const bcrypt = require("bcrypt");
//Logger
const path = require('path')
const logger = require('../../logging/logger')(path.join(__filename))

//________________________JWT authentication_________________________________________________
module.exports = function (req, res, next) {
    const expirationSeconds = 60 * 60 /** 24 * 7*/; // one minute
    const cookieExpiration = Date.now() + expirationSeconds * 1000;

    // Create token if the password matched and no error was thrown.
    UserDB.findOne({email: req.body.email})
        .then(user => {
            if (!user) return next(new AuthError('No such user'))
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (err) return next(new HttpError(404, 'Something went wrong' ))
                if (!response) return next(new AuthError('Wrong password'))
                logger.info('auth ok, go on')
                const token = jwt.sign({email: user.email}, config.secret, {
                    expiresIn: expirationSeconds,
                });
                res.cookie('jwt', token, {
                    expires: new Date(cookieExpiration),
                    httpOnly: true });
                res.redirect('/')
                // return res.status(200).json({
                //     success: true,
                //     token: `JWT ${token}`
                // });


            })


        })
        .catch(err => {
            throw(err)
        })

};
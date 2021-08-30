const express = require("express")
const router = express.Router()
//Interacting with session
const passport = require("passport")
require("../config/passport")(passport)
const config = require('../config/config')
const jwt = require("jsonwebtoken")
//Logger
const path = require('path')
const logger = require('../logging/logger')(path.join(__filename))
//Errors
const HttpError = require('../error/HttpError')
const AuthError = require('../error/AuthError')
//Interacting with DB
const UserDB = require("../Mongo/UserDB")
const bcrypt = require("bcrypt");



//____________________________________________________________________________
//Clear the DB after start
// UserDB.remove({}, () => {
//     console.log('deleted');
// })

//______________________Sign in  page______________________________________
router.get('/', (req, res, next) => {
    // res.clearCookie('jwt')

    res.render('SignIn', {
            title: 'Login',
            active: 'login'
        })
})



//______________________Sign in  POST__________________________________________________
router.post('/login', (req, res, next) => {
    return setAuthToken(req, res, next);
})

//______________________Google shit__________________________________________________
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
)
router.get('/auth/google/callback',
    passport.authenticate('google'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/Menu');
    });
//____________________________________________________________________________________

const setAuthToken = (req, res, next) => {
    const expirationSeconds = 60 * 60 /** 24 * 7*/; // one minute
    const cookieExpiration = Date.now() + expirationSeconds * 1000;

    // Create token if the password matched and no error was thrown.
    UserDB.findOne({email: req.body.email})
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (err) next(new HttpError(404, 'Something went wrong' ))
                if (!response) return next(new AuthError('Wrong password'))

                const token = jwt.sign({email: user.email}, config.secret, {
                    expiresIn: expirationSeconds,
                });

                res.cookie('jwt', token, {
                    expires: new Date(cookieExpiration),
                    httpOnly: true });
                res.redirect('/Menu')
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



module.exports = router


const express = require("express")
const router = express.Router()
//Interacting with session
const passport = require("passport")
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
//____________________________________________________________________________
//Sign in page
router.get('/', (req, res, next) => {
        res.render('SignIn', {
            title: 'Login',
            active: 'login'
        })
})


router.post('/login', async (req, res, next) => {
    passport.authenticate('local',function (err, user, info) {

        if (err) {
            return next(err);
        }

        if (!user) {
            // You'll need to define this route somewhere as well.
            return res.redirect(req.get('referer'))
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/Menu');
        });
    })(req, res, next);

        const Email = req.body.email
        const Password = req.body.password

        logger.info('go on');
        if (Email.length>0 && Password.length>0) {
            UserDB.findOne({email: Email}, (err, user) => {
                if  (bcrypt.compare(Password, user.password)) {
                    // UserDB.Authorize(Email, Password, (err, user) => {
                    if (err === 403) return res.redirect(req.get('referer'));   //Throw specific error
                    if (err) return next(err)   //And other errors
                    if (!user) return next(new AuthError('No such user'))   //If it hasn't found user

                    const token = jwt.sign(user.toJSON(), config.secret, {  //Create token
                        expiresIn: 60 * 60 * 24
                    })

                    res.locals.userID /*= req.session.user*/ = user._id

                    res.json( {     //Respond with token
                        success: true,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        },
                        token: 'JWT ' + token,

                    });

                    // res.redirect('/Menu');
                }
            })

        } else res.redirect(req.get('referer'));
})






module.exports = router


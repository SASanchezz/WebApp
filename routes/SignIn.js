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
                //     token: `JWT ${token}`,
                //     email: email,
                // });


            })


        })
        .catch(err => {
            throw(err)
        })

};


//____________________________________________________________________________
//Clear the DB after start
// UserDB.remove({}, () => {
//     console.log('deleted');
// })
//____________________________________________________________________________
//Sign in  page
router.get('/', (req, res, next) => {
        res.render('SignIn', {
            title: 'Login',
            active: 'login'
        })
})
//____________________________________________________________________________
//Sign in  POST

router.post('/login', (req, res, next) => {
    return setAuthToken(req, res, next);
})
// router.post('/login', async (req, res, next) => {
//     passport.authenticate('jwt',[],function (err, user, info) {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {        //User not found
//             logger.info('User not found')
//             return res.redirect(req.get('referer'))
//         }
//
//         const token = jwt.sign(user.email, config.secret, {  //Create token
//                             expiresIn: 60 * 60 * 24
//                         })
//
//         res.json( {     //Respond with token
//             success: true,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             },
//             token: 'JWT ' + token,
//
//         });
//         req.logIn(user, function (err) {
//             if (err) {
//                 return next(err);
//             }
//             res.locals.userID /*= req.session.user*/ = user._id
//             logger.info(user._id);
//
//             res.redirect('/Menu');
//         });
//     })(req, res, next);
// })


        // OLD REGISTRATION

        // const Email = req.body.email
        // const Password = req.body.password
        //
        // if (Email.length>0 && Password.length>0) {
        //     UserDB.findOne({email: Email}, (err, user) => {
        //         if  (bcrypt.compare(Password, user.password)) {
        //             // UserDB.Authorize(Email, Password, (err, user) => {
        //             if (err === 403) return res.redirect(req.get('referer'));   //Throw specific error
        //             if (err) return next(err)   //And other errors
        //             if (!user) return next(new AuthError('No such user'))   //If it hasn't found user
        //
        //             const token = jwt.sign(user.toJSON(), config.secret, {  //Create token
        //                 expiresIn: 60 * 60 * 24
        //             })
        //
        //             res.locals.userID /*= req.session.user*/ = user._id
        //
        //             res.json( {     //Respond with token
        //                 success: true,
        //                 user: {
        //                     id: user._id,
        //                     name: user.name,
        //                     email: user.email
        //                 },
        //                 token: 'JWT ' + token,
        //
        //             });

                    // res.redirect('/Menu');
            //     }
            // })

        // } else res.redirect(req.get('referer'));






module.exports = router


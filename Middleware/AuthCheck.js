const path = require('path')
const logger = require('../logging/logger')(path.join(__filename))
const passport = require("passport")
const AuthError = require('../error/AuthError')


module.exports = function (req, res, next) {

        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err) return next(err)
            if (!user) {
                if (req.user) {
                return next()

                } else {
                    res.redirect('/SignIn')
                }
            }else if (user){
                return next()

            } else{
                res.redirect('/SignIn')
            }

            // req.logIn(user, err => {
            //     if (err) {
            //         console.log('error'); return next (err) /*next(new AuthError('Authorization went wrong'))*/ }
            //     logger.info('jwt next()')
            //
            //     return next();
            // });
        })(req, res, next);


}
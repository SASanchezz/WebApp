const User = require('../Mongo/UserDB')
const config = require('./config')
const path = require('path')
const logger = require('../logging/logger')(path.join(__filename))
const bcrypt = require("bcrypt")

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    const opts = {
        jwtFromRequest: JWTExtractor,
        secretOrKey: config.secret,
    }
    //Local server
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    //Local server

    passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({email: jwt_payload.email}, function(err, user) {
            if (err) {
                done(err, false);
            }
            if (user) {


                done(null, user);
            } else {
                logger.info('failure')

                done(null, false);
            }
        });
    }));
}

//...........................JWT Extractor...................................
const JWTExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
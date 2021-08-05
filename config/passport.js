const User = require('../Mongo/UserDB')
const config = require('./config')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    const opts = {}
    console.log('here');
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    //Local server
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    //Local server

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

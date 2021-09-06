const User = require('../Mongo/UserDB')
const config = require('./config')
const path = require('path')
const logger = require('../logging/logger')(path.join(__filename))
const UserDB = require("../Mongo/UserDB")

//...........................Strategies..............................
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const ClientID = "14924120985-84dvuglgtidnd4eltuki0q6nm7dmb6gk.apps.googleusercontent.com"

function googleStrategy (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.authId);
    });

    passport.deserializeUser((authId, done) => {
        UserDB.findOne({authId: authId}, (err, user) => {
            if (err) return done(err, null);
            done(null, user);
        });
    })

    passport.use(new GoogleStrategy({
        scope: ['profile'],
        clientID: ClientID,
        clientSecret: config.clientSecret,
        callbackURL: '/auth/google/callback',
    }, function(accessToken, refreshToken, profile, done){

        const authId = 'google:' + profile.id;
        User.findOne({ authId: authId }, function(err, user){
            if (err) return done(err, null);
            if (user) {
                return done(null, user);
            }
            user = new UserDB({
                authId: authId,
                name: profile.displayName,
                created: Date.now(),
            })
            user.save(function(err){
                if(err) return done(err, null);
                done(null, user);
            });
        });

    }))



}






function jwtStrategy (passport) {
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

module.exports = (passport) => {
    jwtStrategy(passport)
    googleStrategy(passport)
}
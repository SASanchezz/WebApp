const express = require("express")
const router = express.Router()
//Interacting with session
const AuthCheck = require('../../Middleware/AuthCheck')
const passport = require("passport")
require("../../config/passport")(passport)
const config = require('../../config/config')
//Logger
const path = require('path')
const logger = require('../../logging/logger')(path.join(__filename))
//Errors
const HttpError = require('../../error/HttpError')
//Interacting with DB
const UserDB = require("../../Mongo/UserDB")
const bcrypt = require("bcrypt");


//______________________Google shit__________________________________________________
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)
router.get('/auth/google/callback',
    passport.authenticate('google', {
        // failureRedirect: '/SignIn'
}), ((req, res) => {
    res.redirect('/')
    }));





module.exports = router
const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const AuthCheck = require('../Middleware/AuthCheck')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const config = require('../config/config')


router.get('/Menu', passport.authenticate('jwt', {
    session: false
}),  (req, res, next) => {
        // res.render('Menu', {
        //     title: 'Main page',
        //     active: 'main'
        //     // userID: req.session.user
        // })
    res.send('Authenticated');
})

module.exports = router
const express = require("express")
const router = express.Router()
const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const config = require('../config/config')


router.get('/Menu',
    passport.authenticate('google'),
    (req, res, next) => {


        // res.render('Menu', {
        //     title: 'Main page',
        //     active: 'main'
        // })
    res.send('Authenticated');
})

module.exports = router
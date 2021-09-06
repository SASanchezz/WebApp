const express = require("express")
const router = express.Router()
const passport = require('passport')
const HttpError = require('../error/HttpError')
const AuthCheck = require('../Middleware/AuthCheck')

router.get('/Calculator',
    AuthCheck,
    (req, res, next) => {
        res.render('Calculator', {
            title: 'Calculator',
            active: 'Calculator',
            // userID: req.session.user
        })
})

module.exports = router
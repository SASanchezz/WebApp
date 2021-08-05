const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const AuthCheck = require('../Middleware/AuthCheck')
const passport = require('passport')




router.get('/Menu', AuthCheck, (req, res, next) => {
        res.render('Menu', {
            title: 'Main page',
            active: 'main',
            userID: req.session.user
        })

})

module.exports = router
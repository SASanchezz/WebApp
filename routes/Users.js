const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const UserDB = require("../Mongo/UserDB")
const AuthCheck = require('../Middleware/AuthCheck')


router.get('/users', (req, res, next) => {

    UserDB.find({},  function (err, docs) {
        if (err) next(err)
        res.render('Users', {
            title: 'All users',
            active: 'Users',
            Database: docs,
            // userID: req.session.user
        })
    })





})

module.exports = router
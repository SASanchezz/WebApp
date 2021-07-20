const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const UserDB = require("../MongoApp/DB")
const AuthCheck = require('../Middleware/AuthCheck')


router.get('/users', AuthCheck, (req, res, next) => {

    UserDB.find({},  function (err, docs) {
        if (err) next(err)
        res.render('users', {
            title: 'All users',
            active: 'Users',
            Database: docs,
            userID: req.session.user
        })
    })





})

module.exports = router
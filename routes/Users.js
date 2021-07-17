const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const UserDB = require("../MongoApp/DB")


router.get('/users', (req, res, next) => {
    if (Authorized) {

    UserDB.find({},  function (err, docs) {
        if (err) next(err)
        res.render('users', {
            title: 'All users',
            active: 'Users',
            Database: docs,
            userID: req.session.user
        })
    })

    } else next(new HttpError(404, 'Not Authorized'));




})

module.exports = router
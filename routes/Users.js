const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')

router.get('/users', (req, res, next) => {
    if (Authorized) {
        res.render('Users', {
            title: 'All users',
            active: 'Users'
        })
    } else next(new HttpError(404, 'Not Authorized'));
})

module.exports = router
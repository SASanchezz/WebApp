const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')

router.get('/Calculator', (req, res, next) => {
    if (Authorized) {
        res.render('Calculator', {
            title: 'Calculator',
            active: 'Calculator'
        })
    } else next(new HttpError(404, 'Not Authorized'));
})

module.exports = router
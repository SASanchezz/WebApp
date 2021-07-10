const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')


router.get('/Menu', (req, res, next) => {
    if (Authorized) {
        res.render('index', {
            title: 'Main page',
            active: 'main'
        })
    } else next(new HttpError(404, 'Not Authorized'));
})

module.exports = router
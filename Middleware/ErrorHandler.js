const HttpError = require('../error/HttpError')
const AuthError = require('../error/AuthError')


module.exports = function errorHandler(err, req, res, next) {
        if (err instanceof HttpError) {
            res.status(err.status)
            res.render('error', {error: err})

        } else if (err instanceof AuthError) {
            res.status(403)
            res.render('error', {error: err })
        } else {
            res.render('error', {error: err })
        }



}


const HttpError = require('../error/HttpError')

module.exports = function errorHandler(err, req, res, next) {
        if (err instanceof HttpError) {
            res.status(err.status)
            res.render('error', {error: err})
        }

}


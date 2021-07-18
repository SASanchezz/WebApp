const HttpError = require('../error/HttpError')

module.exports = function (req, res, next) {
    console.log('AuthCheck called');
    console.log(req.session.user);
    if (!req.session.user) {
        return next(new HttpError('401', 'You are not authorized'))
    }

    next()
}
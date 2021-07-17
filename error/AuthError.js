const util = require('util')


function AuthError(message) {
    Error.captureStackTrace(this, AuthError)
    Error.apply(this, arguments)

    this.message = message || 'Error'
}

util.inherits(AuthError, Error)

AuthError.prototype.name = 'AuthError';

module.exports = AuthError



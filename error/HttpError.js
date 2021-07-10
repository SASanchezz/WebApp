const http = require('http')
const util = require('util')


function HttpError(status, message) {
    Error.captureStackTrace(this, HttpError)
    Error.apply(this, arguments)

    this.status = status
    this.message = message || http.STATUS_CODES[status] || 'Error'
}

util.inherits(HttpError, Error)

HttpError.prototype.name = 'HttpError';

module.exports = HttpError



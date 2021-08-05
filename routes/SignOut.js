const express = require("express")
const router = express.Router()

const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')



router.post('/logout', AuthCheck, async (req, res, next) => {
    await req.session.destroy()
    res.redirect('/');


})






module.exports = router


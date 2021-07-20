const express = require("express")
const router = express.Router()

const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')



router.post('/logout', AuthCheck, async (req, res, next) => {
    await req.session.destroy()
    console.log('deleted probably (signout)');
    res.redirect('/');


})






module.exports = router


const express = require("express")
const router = express.Router()

const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')



router.post('/logout', function(req, res){
    res.clearCookie('jwt')
    req.logout();
    res.redirect('/SignIn');
});

// router.post('/logout', AuthCheck, async (req, res, next) => {
//     await req.session.destroy()
//     res.redirect('/SignIn');
//
//
// })






module.exports = router


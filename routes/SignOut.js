const express = require("express")
const router = express.Router()

const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')


router.get('/deletecookie', function(req, res){
    res.clearCookie('__Host-GAPS')
    res.send('deleted')
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/logout', AuthCheck, async (req, res, next) => {
    await req.session.destroy()
    res.redirect('/');


})






module.exports = router


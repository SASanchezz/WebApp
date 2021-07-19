const express = require("express")
const router = express.Router()
const AuthCheck = require('../Middleware/AuthCheck')



router.post('/logout', AuthCheck, async (req, res, next) => {
            req.session.user = undefined
            res.redirect('/');
})






module.exports = router


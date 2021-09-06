const express = require("express")
const router = express.Router()
//Interacting with session
const passport = require("passport")
require("../config/passport")(passport)
//Logger
const path = require('path')
const logger = require('../logging/logger')(path.join(__filename))
//JWT authentication
const JWTAuth = require('./auth/jwt')



//__________________Clear the DB after start____________________________________________
// UserDB.remove({}, () => {
//     console.log('deleted');
// })

//______________________Sign in  page______________________________________
router.get('/SignIn', (req, res, next) => {

    res.render('SignIn', {
            title: 'Login',
            active: 'login'
        })
})


//______________________Sign in  POST__________________________________________________
router.post('/login', (req, res, next) => {
    return JWTAuth(req, res, next);
})




module.exports = router


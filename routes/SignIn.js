const express = require("express")
const router = express.Router()

const HttpError = require('../error/HttpError')
const AuthError = require('../error/AuthError')
const UserDB = require("../MongoApp/DB")

// UserDB.remove({}, () => {
//     console.log('deleted');
// })

router.get('/', (req, res, next) => {
        res.render('login', {
            title: 'Login',
            active: 'login'
        })
})


router.post('/login', async (req, res, next) => {
        const Email = req.body.email
        const Password = req.body.password

        if (Email.length>0 && Password.length>0) {
            UserDB.Authorize(Email, Password, (err, user) => {

                if (err === 403) return res.redirect(req.get('referer'));
                if (err) return next(err)


                res.locals.userID = req.session.user = user._id

                res.redirect('/Menu');

            })

        } else res.redirect(req.get('referer'));
})






module.exports = router


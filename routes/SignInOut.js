const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')

const UserDB = require("../MongoApp/DB")

// UserDB.remove({}, () => {
//     console.log('deleted');
// })

router.get('/', (req, res, next) => {
    if (!Authorized) {
        res.render('login', {
            title: 'Login',
            active: 'login'
        })
    } else next(new HttpError(404, 'Not Authorized'));
})



router.post('/login', async (req, res, next) => {
    if (!Authorized) {
        const Email = req.body.email
        const Password = req.body.password

        if (Email.length>0 && Password.length>0) {
            console.log('Passed 1 !');
            UserDB.findOne({email: Email}, (err, user) => {
                if(err) {
                    throw err;
                }
                if(user){
                    if (user.checkPassword(Password)) {

                        Authorized = !Authorized
                        res.redirect('/Menu');
                    } else res.redirect(req.get('referer'));
                } else res.redirect(req.get('referer'));
            })
        } else res.redirect(req.get('referer'));
    } else next(new HttpError(404, 'Not Authorized'));
})





module.exports = router


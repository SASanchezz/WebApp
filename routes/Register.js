const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')

const UserDB = require("../Mongo/UserDB")

const ValidateEmail = require('./validators').ValidateEmail;
const ValidatePassword = require('./validators').ValidatePassword;
const ValidateUserName = require('./validators').ValidateUserName;


router.get('/Create', (req, res, next) => {
        res.render('Register', {
            title: 'Create account',
            active: 'create'
        })
})

router.post('/registration', async (req, res, next) => {
        const userName = req.body.UserName
        const email = req.body.email
        const Password1 = req.body.password1
        const Password2 = req.body.password2


        if (userName.length > 0 && Password1.length > 0 && email.length > 0 && Password2.length > 0) {


            if (ValidateEmail(email) && ValidateUserName(userName) && ValidatePassword(Password1)) {
                if (Password1 === Password2) {
                    UserDB.count({email: email}, (err, count) => {
                        if (err) throw err;

                        if (count === 0) {
                            const unit = new UserDB({
                                name: userName,
                                email: email,
                                password: Password1
                            })

                            unit.save(function(err){
                                if(err) return next(err);
                                console.log("Сохранен объект", unit);
                            });

                            res.redirect('/');
                        } else res.redirect(req.get('referer'));
                    })
                } else {
                    res.redirect(req.get('referer'));
                }
            } else res.redirect(req.get('referer'));

        } else res.redirect(req.get('referer'));

})

module.exports = router

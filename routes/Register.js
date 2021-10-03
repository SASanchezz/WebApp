const express = require("express")
const url = require('url');
const router = express.Router()
const HttpError = require('../error/HttpError')

const UserDB = require("../Mongo/DB").Users

const path = require('path');
const logger = require('../logging/logger')(path.join(__filename))

const ValidateEmail = require('../utils/validators').ValidateEmail;
const ValidatePassword = require('../utils/validators').ValidatePassword;
const ValidateUserName = require('../utils/validators').ValidateUserName;


router.get('/Create', (req, res, next) => {
        res.render('Register', {
            title: 'Create account',
            active: 'create',
            errorMessage: req.flash('errMessage')
        })
})

router.post('/registration', async (req, res, next) => {
        const userName = req.body.UserName
        const email = req.body.email
        const Password1 = req.body.password1
        const Password2 = req.body.password2


        if (userName.length > 0 && Password1.length > 0 && email.length > 0 && Password2.length > 0) { // If areas are not null
            if (ValidateEmail(email) && ValidateUserName(userName) && ValidatePassword(Password1)) { // email, password, name corresponds to normal
                if (Password1 === Password2) {
                    UserDB.count({email: email}, (err, count) => {
                        if (err) throw err;

                        if (count === 0) {  //If such email wasn't found
                            const unit = new UserDB({ //Create new record in db
                                name: userName,
                                email: email,
                                password: Password1,
                                created: Date.now(),
                            })

                            unit.save(function(err){
                                if(err) return next(err);
                                console.log("Сохранен объект", unit);
                            });

                            res.redirect('/');

                        } else {
                            logger.info('found')
                            // res.statusCode = 420
                            req.flash('errMessage', 'Email already registered'),
                            res.redirect(req.get('referer'));
                        } //If such email wasn't found
                    })
                } else {
                    res.redirect(req.get('referer'));
                }
            } else res.redirect(req.get('referer'));

        } else res.redirect(req.get('referer'));

})

module.exports = router

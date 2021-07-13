const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const UserDB = require("../MongoApp/DB")


router.get('/users', (req, res, next) => {
    let Docs;
    UserDB.find({}, async function (err, docs) {
        Docs = docs

    })
    console.log(Docs);



    //if (Authorized) {
        res.render('users', {
            title: 'All users',
            active: 'Users',
            Database: Docs
        })


    //} else next(new HttpError(404, 'Not Authorized'));
})

module.exports = router
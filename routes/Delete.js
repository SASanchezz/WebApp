const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const mongoose = require('mongoose');
const UserDB = require("../Mongo/UserDB")
const AuthCheck = require('../Middleware/AuthCheck')


router.post('/delete/:id', AuthCheck, async (req, res, next) => {
    console.log('params-id: ' + mongoose.Types.ObjectId(req.params._id));


    UserDB.findOneAndRemove({_id: req.params.id}, (err) => {
        if (err) next(new HttpError(404, 'Cannot delete the account'))

        req.session.destroy()
        res.redirect('/');
    })



// TODO 19.07.2020
})

module.exports = router

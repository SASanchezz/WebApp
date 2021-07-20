const express = require("express")
const router = express.Router()
const HttpError = require('../error/HttpError')
const mongoose = require('mongoose');
const UserDB = require("../MongoApp/DB")



router.post('/delete/:id', async (req, res, next) => {
    console.log('delete pushed');
    console.log(req.params.id);
    UserDB.findOne({_id: new mongoose.Types.ObjectId(req.params._id)}, (err, user) => {
        console.log(user)
    });


    UserDB.deleteOne({_id: req.params._id})
// TODO 19.07.2020
})

module.exports = router

const express = require("express")
const router = express.Router()
//BD with topics
let Topics;
require("../Mongo/DB").Topics.find({}, (err, topics) => {
    Topics = topics;
})

const path = require("path");
const logger = require('../logging/logger')(path.join(__filename))

const AuthError = require('../error/AuthError')
const AuthCheck = require('../Middleware/AuthCheck')


    router.get('/Discussions',
    // AuthCheck,
    (req, res, next) => {




        res.render('Discussions', {

            title: 'Topics',
            active: 'Discuss',
            topics: Topics,
        })
    })

module.exports = router

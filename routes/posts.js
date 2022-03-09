var express = require('express')
var router = express.Router()
const passport = require('passport')
const Post = require('../models/post')

/* GET home page. */
router.get('/create', function (req, res, next) {
    res.render('post_create', { user: req.user })
})
router.post('/create', function (req, res, next) {
    const post = new Post({
        message: req.body.message,
        author: req.user.username,
        authorid: req.user,
    }).save((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})
module.exports = router

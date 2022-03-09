var express = require('express')
var router = express.Router()
const Post = require('../models/post')
const passport = require('passport')
/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });

    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
    } else {
        req.session.viewCount = 1
    }
    Post.find({}, (err, results) => {
        console.log(results)
        res.render('index', {
            user: req.user,
            viewCount: req.session.viewCount,
            messages: results,
        })
    })
})
router.get('/log-out', (req, res) => {
    req.logout()
    res.redirect('/')
})
module.exports = router

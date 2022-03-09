var express = require('express')
var router = express.Router()
const Post = require('../models/post')
const passport = require('passport')
const User = require('../models/user')
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

router.get('/become-member', (req, res) => {
    res.render('become_member')
})
router.post('/become-member', (req, res, next) => {
    console.log('phase 1')
    if (req.body.passcode == 'secret') {
        User.updateOne(
            { id: req.user._id },
            { memberStatus: true },
            (err, result) => {
                if (err) {
                    console.log('phase 2')
                }
                console.log('phase 3')
                console.log('RESULT:', result)
                res.redirect('/')
                next()
            }
        )
    } else {
        res.redirect('/')
    }
})
module.exports = router

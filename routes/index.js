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
        console.log('phase 2.0')
        User.updateOne(
            { _id: req.user._id },
            { memberStatus: true },
            (err, result) => {
                if (err) {
                    console.log('phase 2.2')
                }
                console.log('phase 3')
                console.log('RESULT:', result)
                res.redirect('/')
            }
        )
    } else {
        res.redirect('/')
    }
})
router.get('/remove-member', (req, res) => {
    res.render('remove_member', { user: req.user })
})
router.post('/remove-member', (req, res, next) => {
    User.updateOne(
        { _id: req.user._id },
        { memberStatus: false },
        (err, result) => {
            if (err) {
            }
            res.redirect('/')
        }
    )
})
module.exports = router

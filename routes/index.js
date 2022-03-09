var express = require('express')
var router = express.Router()
const passport = require('passport')
/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });

    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
    } else {
        req.session.viewCount = 1
    }
    res.render('index', { user: req.user, viewCount: req.session.viewCount })
})

module.exports = router

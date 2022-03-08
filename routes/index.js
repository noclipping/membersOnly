var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
    } else {
        req.session.viewCount = 1
    }
    res.send('<p>View count is: ' + req.session.viewCount + '</p>')
})

module.exports = router

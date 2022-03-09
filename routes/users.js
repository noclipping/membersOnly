var express = require('express')
var router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const passport = require('passport')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})
// LOGIN USER
router.get('/login', function (req, res, next) {
    if (req.user) {
        res.redirect('/')
    }
    res.render('user_login', { title: 'Login User' })
})
router.post(
    '/login',
    (req, res, next) => {
        next()
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: './login',
    })
)

// CREATE USER
router.get('/create', function (req, res, next) {
    if (req.user) {
        res.redirect('/')
    }
    res.render('user_create', { title: 'Create User' })
})
router.post('/create', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            next(err)
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            memberStatus: false,
        }).save((err) => {
            if (err) {
                return next(err)
            }
            res.redirect('/')
        })
    })
})

module.exports = router

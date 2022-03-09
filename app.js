require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MongoStore = require('connect-mongo')
var logger = require('morgan')
const ms = require('milliseconds')
// routes
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const User = require('./models/user')
// mongoDB
const mongoDB = process.env.MONGO_DB
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// express session + passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        cookie: { maxAge: ms.days(4) },
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: mongoDB }),
    })
)

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, user)
        })
    })
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

app.use(passport.initialize())
app.use(passport.session())

// END PASSPORT + SESSION SECTION

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/post', postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app

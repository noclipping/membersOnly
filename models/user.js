const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    memberStatus: { type: Boolean, required: true },
})

module.exports = mongoose.model('User', UserSchema)

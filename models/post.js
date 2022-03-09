const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    message: { type: String, required: true },
    author: { type: String, required: true },
    authorid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Post', PostSchema)

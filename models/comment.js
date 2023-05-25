const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    commment: {
        type: String,
        required: true
    },
    date: Date
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
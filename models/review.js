const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = new Schema({
    content: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    facility: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Review', reviewSchema)
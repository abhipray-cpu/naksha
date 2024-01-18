const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sportTypeSchema = new Schema({
    image: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    }
})
module.exports = mongoose.model('Sport', sportTypeSchema)
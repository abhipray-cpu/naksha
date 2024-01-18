const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },

    resetToken: String,
    resetTokenExpiration: Date,
    facility: [{
        type: mongoose.Types.ObjectId,
        ref: 'facilities',
        required: true
    }, { collection: 'facilities' }]
})
module.exports = mongoose.model('User', userSchema)
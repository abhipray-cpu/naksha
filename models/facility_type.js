const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facilitySchema = new Schema({
    Wallpaper: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Type', facilitySchema)
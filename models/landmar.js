/*this container will contain following fields:
1)Name of landmark
2)Facilities associated with it we can add 
aggregation or simply refrencing for getting the 
facilities from the property*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const landMarkSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    facilities: {
        type: Array,
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'facilities'
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        city: {
            type: String,
            required: true,
        }
    }
})

module.exports = mongoose.model('landMark', landMarkSchema)
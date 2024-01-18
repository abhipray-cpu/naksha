const mongoose = require('mongoose')
const Schema = mongoose.Schema
const facilitySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    //this filed will contain the link of google map to the location
    Glocation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    property_type: {
        type: String,
        enum: ['Bar', 'Club', 'Dance Club', 'Amusement Park',
            'Banquet Hall', 'Zoo', 'Gym', 'Hospital', 'Game',
            'Hotel', 'Mall', 'Multiplex', 'Park', 'Restaurant',
            'Street Food', 'Yoga', 'Cooking Class', 'Badminton',
            'Basketball', 'Cricket', 'Football', 'Tennis', 'Baseball',
            'Golf', 'Hockey', 'Karate', 'Kick Boxing', 'Rugby', 'Skating',
            'Snooker', 'Squash', 'Swimming', 'Volleyball', 'Boxing',
            'Archery', 'Table Tennis', 'Bowling', 'Cycling'
        ],
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    //this is the geoJson data and keep in mind in GeoJson data
    //the langitude is added first and then latitude which is reverse of the general
    //convention
    //this will contain the coordinates of the location which will be usued to calculate the near by facilities
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}).index({title:'text',property_type:'text'},{weights:{title:10,property_type:6}})
// trying to create weighted text index in this case to add full text search feature


module.exports = mongoose.model('facilities', facilitySchema)
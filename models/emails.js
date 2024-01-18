const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subsSchema  = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    }
})

module.exports = mongoose.model('SubscriptionList',subsSchema)
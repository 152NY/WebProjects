const {Schema, model} = require('mongoose');
const order = new Schema({
    //personal data
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    
    //sum of order
    nominalSum: {
        type: Number,
        required: true
    },
    usedCahback: {
        type: Number,
        required: true
    },
    isCashbackUsed: {
        type: Boolean,
        required: true
    },
    totalSum: {
        type: Number,
        required: true
    },

    //order data
    memory:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: false
    },
    
});
module.exports = model('Order', order);
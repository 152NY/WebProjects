const {Schema, model} = require('mongoose');
const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    selector:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    lng:{
        type: Number,
        required: false
    },
    lat:{
        type: Number,
        required: false
    }, 
    price: {
        type: String,
        required: false
    },
    descriptionEN: {
        type: String,
        required: false
    },
    descriptionDE: {
        type: String,
        required: false
    },
    descriptionRU: {
        type: String,
        required: false
    },
    filePathFirst: {
        type: String,
        required: false
    },
    filePathSecond: {
        type: String,
        required: false
    },
    filePathThird: {
        type: String,
        required: false
    },
    filePathForth: {
        type: String,
        required: false
    },
    filePathFifth: {
        type: String,
        required: false
    },
    filePathSixth: {
        type: String,
        required: false
    },
    filePathSeventh: {
        type: String,
        required: false
    }
    
});
module.exports = model('Building', schema);
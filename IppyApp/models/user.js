const {Schema, model} = require('mongoose');
const user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
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
    sum: {
        type: Number,
        required: false,
        default: 0
    },
    roles:[{
        type: String,
        ref: 'role'
    }]
});
module.exports =  model('User', user);
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    
    Email:{
            type:String,
            required: true,
            unique:true
        },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    }

},{timestamps:true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
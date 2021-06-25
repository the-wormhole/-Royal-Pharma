const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Company:{
        type:String,
        required:true
    }
},{timestamps:true});

const Med = mongoose.model('Med',medSchema);

module.exports = Med;
const mongoose = require('mongoose');
const multer = require('multer');   //<<<< ----- I'm setting up multer here as I want to establish seperate storages for Profile pics and other uploads that are made to a post 
    //<<--- That is I'll set multer up for different models, separately

    //<<-- also multer is a middleware
const path = require('path');
const AVATAR_PATH = path.join('/uploads/customers/avatars') //<<-- string converted to path 

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
    },
    avatar:{
            type:String
    }

},{timestamps:true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {     //<< --- cb is the call back function
      cb(null, path.join(__dirname, "..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)                         //<<--- Makes filename unique by appending suffix epoch time
    }
});

//static methods
customerSchema.statics.uploadedAvatar = multer({ storage:storage}).single('avatar');     //<<-- statics defines a single instance of a function or variable for the entire model or class
    //<< --- the above line assigns the Disk Storage of Multer to its storage property
customerSchema.statics.avatarPath = AVATAR_PATH;

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
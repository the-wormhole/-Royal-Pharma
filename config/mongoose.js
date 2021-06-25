const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Med-list");

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
});
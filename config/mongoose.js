const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Med-list",{useUnifiedTopology: true}); ///<<<<<--------- to resolve deprecation warning being displayed on the terminal

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
});

module.exports = db;            /// <<<<<<<<<<<------ Don't forget exporting this, otherwise it may cause an error in storing Mongo store session cookies
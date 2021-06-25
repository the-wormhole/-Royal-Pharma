const port = 8000;
const express = require('express');
const path = require('path');

const db = require('./config/mongoose');
const Med = require('./models/medicine');

const app = express();
const router = require('./routes/index');

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());                ///<<<<<------------------ this is a parser that puts form data into req.body   
app.use(express.static('assets'));


app.use('/',router);                         ///<<<<<-------------------- router middleware for all routes

app.listen(port,(err)=>{
    if(err){
        console.log("Error!!!!")
    }
    console.log("Server up!!!");
    console.log("Port:",port);
});


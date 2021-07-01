const port = 8000;
const cookieParser = require('cookie-parser');
const express = require('express');
//const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//const Med = require('./models/medicine');

const app = express();
const router = require('./routes/index');

app.use(express.urlencoded());                ///<<<<<------------------ this is a parser that puts form data into req.body
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('assets'));

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);        ///<<<<<----------------- detects script andd styles in a page and puts it in the right position in the layout page

app.use('/',router);                         ///<<<<<-------------------- router middleware for all routes

app.listen(port,(err)=>{
    if(err){
        console.log("Error!!!!")
    }
    console.log("Server up!!!");
    console.log("Port:",port);
});


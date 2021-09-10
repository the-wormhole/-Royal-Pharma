const port = 8000;
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
//const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//const Med = require('./models/medicine');

//Used for passport local authentication
const session = require('express-session');     ///<<<---- encrypts the session cookie
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-local-strategy');
const googleStrategy = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);           //<<<<<<<<<------- Used to store session cookie in the DB
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/customMiddleware');

const app = express();
const router = require('./routes/index');

app.use(sassMiddleware({

    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,                        //<<-- To display if there were any errors while coonversion in the console
    outputStyle: 'extended',        //<<--- Do we wish to see the converted scss to css in extended format or single line 
    prefix:'/css'       //<<-- Where to look for CSS files
    
}))
app.use(express.urlencoded());                ///<<<<<------------------ this is a parser that puts form data into req.body
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname + '/uploads')); //<<-- Making the uploads folder available to the browser

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);        ///<<<<<----------------- detects script andd styles in a page and puts it in the right position in the layout page

app.use(session({
    name:'Medi_id',
    secret: 'anything',                     ////<<<<<<------------------ Change the session cookie before Deployment ~~~~ IMPORTANT
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore({

        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err+"Error in setting up mongostore!!!"|| 'connect-mongodb server setup ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());           ///<<<<------------------  With the flash middleware in place, all requests will have a req.flash() function that can be used for flash messages.
app.use(customMware.setFlash) ///<<<------------- middleware that fetches the flash message from the req.flash() and puts it in res.locals

app.use(passport.setAuthenticatedUser);

app.use('/',router);                         ///<<<<<-------------------- router middleware for all routes

app.listen(port,(err)=>{
    if(err){
        console.log("Error!!!!")
    }
    console.log("Server up!!!");
    console.log("Port:",port);
});


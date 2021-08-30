const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;   //<<----------- passport-oauth contains both oauth and oauth2 
//<<-- OAuth2 has a bit of restricted access to the user information
const crypto = require('crypto'); //<<--- to Auto generate a password when using google authentication, since password field is kept required
const Customer = require('../models/customer');

passport.use(new googleStrategy({
        clientID:process.env.GOOGLE_CLIENTID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:"http://localhost:8000/customers/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){        //<<-------- accessToken is returned by google after authenticating him/her, refreshToken asks for a new Token if the  previous one expires
                                                    //<<---- the user information is returned in profile variable

    }
))

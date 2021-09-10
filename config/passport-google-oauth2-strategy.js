const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;   //<<----------- passport-oauth contains both oauth and oauth2 
//<<-- OAuth2 has a bit of restricted access to the user information
const crypto = require('crypto'); //<<--- to Auto generate a password when using google authentication, since password field is kept required
const Customer = require('../models/customer');

passport.use(new googleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:"http://localhost:8000/customer/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){        //<<-------- accessToken is returned by google after authenticating him/her, refreshToken asks for a new Token if the  previous one expires
                                                    //<<---- the user information is returned in profile variable

        Customer.findOne({Email:profile.emails[0].value}).exec((err,customer)=>{    //Find customer
            if(err){
                console.log("Error in google strategy-passport..",err);
                return;
            }
            console.log(profile);
            if(customer){

                return done(null,customer); //If found the customer, then set customer as req.user
            }else{

                Customer.create({
                    Name:profile.displayName,
                    Email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex') //<<-- Random password genration using crypto
                },function(err,customer){
                    if(err){
                        console.log('Error in creating customer google-strategy passport!!',err);
                        return;
                    }
                    return done(null,customer);
                });
            }

        })                                                    

    }
))


module.exports = passport;
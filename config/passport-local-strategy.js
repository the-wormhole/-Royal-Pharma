const passport = require('passport');
const Customer = require('../models/customer');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'Email',             ///<<<<-------------------------    Since the project has Email field instead of username, so we use this to change it
    passReqToCallback: true            ///<<<<-------------------------    makes the request variable accessible in the passport

},function(req, Email,password,done){   

    Customer.findOne({Email:Email},function(err,customer){
        if(err){
            console.log("Error in finding customer --> Passport");
            req.flash('error',err);
            return done(err);
        }
        if(!customer || customer.password != password){
            req.flash('error','Invalid Email Id/ Password')
            //console.log("Incorrect Username / Password");
            return done(null,false,{message:"Incorrect Username / Password"});
        }

        return done(null,customer);
    });

}))

passport.serializeUser(function(customer,done){

    return done(null,customer.id);
});

passport.deserializeUser(function(id,done){
    Customer.findById(id, function(err,customer){
        if(err){
            console.log("Error in finding customer --> Passport");
            return done(err);
        }

        return done(null,customer);
        
    })
})

passport.checkAuthentication = function(req,res,next){
                        
    if(req.isAuthenticated()){          //<<<< --------------- This middleware is like a license check, if you have the license, you can go ahead to access the services
        return next();
    }

    return res.redirect('/customer/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){         //<<<<<---------- This is to set customer for views to access customer using locals

    if(req.isAuthenticated()){

        res.locals.customer = req.user;                 //<<<<<<---- passport after authentication places the customer in the req(req.user contains the authenticated customer)
        console.log("Setting up customer",req.user)
    }
    next();
    //return res.redirect('/customer/sign-in');
}

module.exports = passport;

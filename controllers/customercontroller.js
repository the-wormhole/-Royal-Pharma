const Customer = require('../models/customer');
const homeController = require('./homecontroller');


module.exports.signIn = function(req,res){

    return res.render('customer_sign-in',{
        header:"Solution to all your miseries"
    });
}

module.exports.signUp = function(req,res){

    return res.render('customer_sign-up',{
        header:"Solution to all your miseries"
    });
}

module.exports.create = function(req,res){

    //Karegey
    console.log(req.body,);
    Customer.create({
        Name:req.body.Name,
        Email:req.body.Email,
        password:req.body.password
    },function(err,newcustomer){
        if(err){
            console.log("Error in creating a new Customer!!",err);
            // alert("Error in creating new Customer");
            return;
        }
        console.log("**********",newcustomer);
        return res.redirect('home');
    });
}

module.exports.createSession = function(req,res){

    //Karegey
}
const Customer = require('../models/customer');
//const homeController = require('./homecontroller');

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
     //console.log(req.body['confirm-password']);
    if(req.body.password != req.body['confirm-password']){
         return res.redirect('back');
    }

    Customer.findOne({Email:req.body.Email},function(err,customer){
        if(err){console.log('Error in finding the user while signing Up!!')}

        if(!customer){

            Customer.create({
                Name:req.body.Name,
                Email:req.body.Email,
                password:req.body.password
            },function(err,newcustomer){
                if(err){console.log("Error in creating a new Customer!!",err);return;}
        
                console.log("**********",newcustomer);
                //return res.redirect('home');
                // return res.render("customer_profile",{
                //     customer_name:newcustomer.Name,
                //     header: "Profile Page",
                // });
                return res.redirect('/customer/sign-in');
            });
        }else{
            return res.redirect('back');
        } 
    })
    
}

module.exports.createSession = function(req,res){

    //Karegey
}
const Customer = require('../models/customer');
const fs = require('fs');
const path = require('path');
//const homeController = require('./homecontroller');

module.exports.profile = function(req,res){
    Customer.findById(req.params.id,function(err,customer){
        return res.render('customer_profile',{

            customer_name:"Hello customer!!",
            header:"Solution to all your miseries",
            profile_customer: customer
            //customer:customer
        });
    });

}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect(`/customer/profile/${req.user.id}`);
    }
    return res.render('customer_sign-in',{
        header:"Solution to all your miseries"
    });
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect(`/customer/profile/${req.user.id}`);
    }

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

module.exports.update = async function(req,res){

    // let id = req.params.id;
    // if(req.user.id == id){
    //     Customer.findByIdAndUpdate(id,req.body,function(err,customer){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorised');
    // }
    let id = req.params.id;
    // console.log(Customer.avatarPath);
    // console.log(req.user.id,id);
    if(req.user.id == req.params.id){

        try{
            let customer = await Customer.findById(id);
            Customer.uploadedAvatar(req,res, async function(err){     //<<---  Since the form has an enctype as multiform so we can't access the req.body directly, we require this function for that purpose
                
                if(err){
                    console.log('Error in Multer', err);
                    req.flash('err', 'Error in Uploading file!');
                }
                customer.Name = req.body.Name;
                customer.Email = req.body.Email;
                if(req.file){
                   // console.log(req.file);
                    if(customer.avatar){        //<<-- Replacing avatar if it already exists
                        //var p = customer.avatar;
                        fs.unlinkSync(path.join(__dirname,"..",customer.avatar))

                    }
                    customer.avatar = Customer.avatarPath + '/' + req.file.filename;
                }

                customer.save();
                req.flash('success',"Profile updated!");
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            console.log(err);
            return res.status(401).send('Unauthorised');
        }
    }else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');
    }

}

module.exports.createSession = function(req,res){

    req.flash('success', "Successfully logged in!!!");
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    req.logout();                                   //<<<<<<<<----------- This function is supplied by passport into the req
    req.flash('success', "Successfully logged out!!!");
    return res.redirect('/');
}
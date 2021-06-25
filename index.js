const port = 8000;
const express = require('express');
const path = require('path');

const db = require('./config/mongoose');
const Med = require('./models/medicine');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());                ///<<<<<------------------ this is a parser that puts form data into req.body   
app.use(express.static('assets'));


app.get('/',function(req,res){

    Med.find({},function(err,medicines){

        if(err){console.log('Error in loading contacts!!'); return;};
        
        res.render("home",{
            title:"Royal Pharma",
            medicines: medicines
        });
    })

    
    //console.log(res.locals.title)
});

app.post('/new-med',function(req,res){


    Med.create({
        Name:req.body.Name,
        Company: req.body.Company
    },function(err,newMedicine){
        if(err){
            console.log('Error in creating contact');
            return;
        }

        console.log('******',newMedicine);
        return res.redirect('back');
    })
    //res.redirect('back');
})

app.get('/delete-med/',function(req,res){

    let id = req.query.id;
    console.log(typeof(id));
    Med.findByIdAndDelete(id,function(err){
        if(err){console.log("Error in deleting the Medicine from DB"); return;}

        return res.redirect('back');
    });

})

app.listen(port,(err)=>{
    if(err){
        console.log("Error!!!!")
    }
    console.log("Server up!!!");
    console.log("Port:",port);
});


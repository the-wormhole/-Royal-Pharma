const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure: false,
    auth:{
        user: 'nayan.agg13',
        pass: process.env.EMAIL_PASSWORD
    }
});

let renderTemplate = (info, relPath) =>{
    let emailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relPath),
                    info,               //<<--- Contains the variables required to be rendered in the template
                    function(err,template){
                        if(err){
                            console.log(err,'Error in rendering template!!');
                        }
                        emailHTML = template;
                    });
    return emailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}

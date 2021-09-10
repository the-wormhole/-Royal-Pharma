const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) =>{
    console.log('Inside newComments mailer!!!',process.env.EMAIL_PASSWORD);
    let HTMLstring = nodeMailer.renderTemplate({comment:comment},'/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'nayan.agg13@gmail.com',
        to:   'na.ag13011999@gmail.com',                            //comment.customer.Email,
        subject:'New Comment published on MedBook!',
        html:HTMLstring
    },(err,info)=>{
        if(err){
            console.log('Error in sending email!',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });

}

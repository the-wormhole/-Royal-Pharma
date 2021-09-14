const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){              //<<----------- 'emails' is the type of queue or the name of the queue
                                               //<<---------- 'job' contains 2 things 1. the function that needs to be called 2. The data that needs to be passed to the function for execution(example the name field of user in a mail)             
    console.log('Emails worker is processing the job',job.data);

    commentsMailer.newComment(job.data);
    done();
})
const Comment = require('../models/comments');
const Post = require('../models/post');
const Customer = require('../models/customer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');
const CommentsMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        //,function(err,post){

        if(post){                           //<<<<<<<<<---------- Check if the post exists in the database

            let comment = await Comment.create({
                content:req.body.content,
                customer:req.user._id,
                post:req.body.post
            });
            //,function(err,comment){
            comment = await comment.populate('customer', 'Email').execPopulate();

            post.comments.push(comment);
            post.save();                //<<<----------- Updating the array of comments and saving it (functionality provided by mongoDB)

            //CommentsMailer.newComment(comment);         //<<-------- Calling nodemailer for sending mail

            let job = queue.create('emails',comment).save(function(err) {      //<<-- 'emails' is the name of the queue created by us in the workers folder and has been imported by us 
                if(err){console.log('Error in creating a queue ');return;}             // <<-------- Initiating the worker for comments mailing
                console.log('job enqueued ',job.id);
            })

            let customer = await Customer.findById(comment.customer);
            if(req.xhr){

                return res.status(200).json({
                    data:{
                        comment:comment,
                        customer_name:customer.Name,
                        post_id:req.body.post
                    },
                    message: 'Comment added successfully!'
                });
            }

            console.log(comment);
            req.flash('success','Comment added!');
            res.redirect('/');
            //})
        }
    //})
    }catch(err){

        console.log("Error in adding Comment",err);
        if(req.xhr){

            return res.status(400).json({
                data:{
                },
                message: 'Error in adding comment!'
            });
        }
        req.flash('error','Error in adding Comment!');
        return res.redirect('back');
    }
    
    //console.log(req.body.post);
    
}
module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        //,function(err,comment){
        if(comment.customer == req.user.id){

            let postId = comment.post;
            comment.remove();
                
            await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}},{useFindAndModify: false}); //<<<<-------------- 'useFindAndModify': true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
            //,function(err,post){
                req.flash('success','Comment deleted!');
            return res.redirect('back');
            //});
        }else{
            req.flash('error','Unauthorised, you can\'t delte this comment!');
            return res.redirect('back');
        }
    //});
    }catch(err){
        
        req.flash('error','Error in Deleting comments!!');
        console.log("Error in Deleting comments!!",err);
    }
    
}
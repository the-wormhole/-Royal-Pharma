const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req,res){

    Post.findById(req.body.post,function(err,post){

        if(post){                           //<<<<<<<<<---------- Check if the post exists in the database
            Comment.create({
                content:req.body.content,
                customer:req.user._id,
                post:req.body.post
            },function(err,comment){

                post.comments.push(comment);
                post.save();                //<<<----------- Updating the array of comments and saving it (functionality provided by mongoDB)

                res.redirect('/');
            })
        }
    })
    //console.log(req.body.post);
    
}
module.exports.destroy = function(req,res){

    Comment.findById(req.params.id,function(err,comment){

        if(comment.customer == req.user.id){

            let postId = comment.post;
            comment.remove();
            
            Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}
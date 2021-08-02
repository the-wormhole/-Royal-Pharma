const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    //console.log(req.user._id);
    Post.create({
        content:req.body.content,
        customer:req.user._id
    },function(err,newPost){
        if(err){
            console.log("Error in creating Posts!!!");
        }
        console.log('******',newPost);
        return res.redirect('back');
    })

}

module.exports.destroy = function(req,res){

    Post.findById(req.params.id,function(err,post){

        if(err){
            console.log(err,'Error in deleting post !!');
        }
                                                     ///<<<<------------- .id stores id in string format, which should be used while comparing 2 ids   
        if(post.customer == req.user.id){               ///<<<<<----------- Checking if the post is being deleted by the post creater

            //console.log(post);
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log(err,'Error in deleting post comments !!');
                }
                return res.redirect('back');
            });
        }else{

            return res.redirect('back');           //<<<----- unauthorized
        }
    })
}
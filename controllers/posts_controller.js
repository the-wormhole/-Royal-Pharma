const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
    //console.log(req.user._id);
    try{
        let newPost = await Post.create({
            content:req.body.content,
            customer:req.user._id
        });
        console.log("******",newPost);
        return res.redirect('back');
    }catch(err){

        console.log("Error",err);
        return;
    }
    

}

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        //,function(err,post){

        // if(err){
        //     console.log(err,'Error in deleting post !!');
        // }
                                                     ///<<<<------------- .id stores id in string format, which should be used while comparing 2 ids   
        if(post.customer == req.user.id){               ///<<<<<----------- Checking if the post is being deleted by the post creater
            //console.log(post);
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            // ,function(err){
            //     if(err){
            //         console.log(err,'Error in deleting post comments !!');
            //     }
                return res.redirect('back');
            //});
        }else{

            return res.redirect('back');           //<<<----- unauthorized
        }
    //})
    }catch(err){
        console.log("Error in deleting posts !!", err);
        return;
    }

    
}
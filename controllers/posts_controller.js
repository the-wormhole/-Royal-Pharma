const Post = require('../models/post');
const Comment = require('../models/comments');
const Customer = require('../models/customer');

module.exports.create = async function(req,res){
    //console.log(req.user._id);
    try{
        let newPost = await Post.create({
            content:req.body.content,
            customer:req.user._id
        });
        let customer = await Customer.findById(newPost.customer);
        if(req.xhr){                        //<<<--------- AJAX request

            return res.status(200).json({
                data:{
                    post:newPost,
                    customer_name:customer.Name,
                    avatar:customer.avatar
                },
                message:"Post Created!"
            });
        }

        console.log("******",newPost);
        req.flash('success','New Post Published!!');
        return res.redirect('back');
    }catch(err){

        if(req.xhr){                        //<<<--------- AJAX request

            console.log('Error Empty post');
            req.flash('error','Error Empty post');
            return res.status(400).json({
                data:{},
                message:'Error, Empty post'
            });
        }
        console.log("Error",err);
        req.flash('error','Error in Publishing the Post');
        return res.redirect('back');
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

            if(req.xhr){

                return res.status(200).json({
                    data:{post_id:req.params.id},
                    message: "Post Deleted!"
                });

            }
                req.flash('success','Post removed, successfully!!');
                return res.redirect('back');
            //});
        }else{

            if(req.xhr){

                return res.status(401).json({
                    data:{},
                    message: "Unauthorized!"
                });
    
            }
            req.flash('error',"Unauthorised, you can't delete this post!!");
            return res.redirect('back');           //<<<----- unauthorized
        }
    //})
    }catch(err){
        console.log("Error in deleting posts !!", err);

        if(req.xhr){

            return res.status(400).json({
                data:{},
                message: "Error while Deleting!"
            });

        }
        req.flash('error',"Error in deleting posts !!");
        return;
    }

    
}
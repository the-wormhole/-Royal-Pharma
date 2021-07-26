const Post = require('../models/post');


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
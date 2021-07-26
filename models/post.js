const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    content:{

        type:String,
        required:true
    },
    customer:{

        type:mongoose.Schema.Types.ObjectId,
        ref: 'customer'                     // <<--- Don't forget reference, makes pre populating from DB less ambigious
    },

        //  Include the array of comments in the posts
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
        }
    ]
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
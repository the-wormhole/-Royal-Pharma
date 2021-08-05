
{
    // Method to submit new form data using AJAX
    let createPost = function(){

        let newPostform = $('#new-post-form');
        newPostform.submit(function(e){
        e.preventDefault();
        
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostform.serialize(),          ///<<<----- Converts form input data to json
                success: function(data){
                    let newPost = newPostDom(data.data.post,data.data.customer_name);

                    $('#posts_container > ul').prepend(newPost);

                    deletePost($(' .delete-post-button',newPost)); //<<---- Jquery method of searching for class 'delete-post-button' in newPost 
                           //<<-- the above line just adds the delete button to the newpost created no other post
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                
                },
                error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme: 'relax',
                        text: err.message ,
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }
            });

        });
    }

    //method to create post in DOM

    let newPostDom = function(post,name){
        // We can only use _id in javascript as .id is undefined in it 
        return $(`<li id="post-${post._id}">     

        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>

        <p>
            ${name}<br>
            ${ post.content }
    
        </p>
        <div class="post-comments">
            <form action="/comments/create" method="POST" id = "new-comment-form">
                <textarea name="content" cols="30" rows = "3" placeholder="Type your comment here..."></textarea>
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="Comment">
            </form>

            <div class="post-comments-list">
                <ul id = "post-comments-${ post._id }">

                </ul>
            </div>
        </div>
    
    </li>`)
    }


    // method to delete a post using AJAX

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){

                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: data.message ,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme: 'relax',
                        text: err.message ,
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }
            })
        })
    }

        // method to add delete to all the posts
    let addDelete = function(){
        let allposts = $('#posts_container > ul >li');

        document.querySelectorAll('#posts_container > ul >li').forEach(function(thisValue){     //<<-- thisValue:-  A value to be passed to the function to be used as its "this" value.If this parameter is empty, the value "undefined" will be passed as its "this" value
            deletePost($(' .delete-post-button',thisValue));       
        });

    }

    createPost();
    addDelete();
}
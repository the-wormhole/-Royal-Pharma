{
    //console.log('hey');

    var createComment = function(createLink){

            $(createLink).submit(function(e){
                e.preventDefault();
                console.log('hey', createLink);

                $.ajax({
                    type:'post',
                    url: '/comments/create',
                    data: createLink.serialize(),
                    success: function(data){
                        
                        let newComment = newCommentDom(data.data.comment,data.data.customer_name);
                        $(`#post-comments-${data.data.post_id}`).prepend(newComment);


                        new Noty({
                            theme: 'relax',
                            text: data.message,
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },error:function(err){
                        //console.log(err.responseText);
                        new Noty({
                            theme: 'relax',
                            text: err.responseText.message ,
                            type: 'error',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    }
                });
                return;
            });

    }

    var newCommentDom = function(comment,name){

        return $(`<li>

            <a href="/comments/destroy/${comment._id}">X</a>

        <b>${name}</b>
        <p>
            ${comment.content}
        </p>
    </li>`)
    }
    var addCreateComment = function(){
        let newCommentForms = $('.new-comment-form');
        newCommentForms.each(function(){
            let self = $(this);

        })
        document.querySelectorAll('.new-comment-form').forEach(function(thisValue){     //<<-- thisValue:-  A value to be passed to the function to be used as its "this" value.If this parameter is empty, the value "undefined" will be passed as its "this" value
            //console.log(thisValue);
            console.log('here');
            createComment($(thisValue));
            //deletePost($(' .delete-post-button',thisValue));       
        });
    }
    addCreateComment();
    //createComment();
}
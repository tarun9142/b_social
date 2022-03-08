{
    // method to submit form data for new post using AJAX 
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post,data.data.user_name);
                    $("#posts-container>ul").prepend(newPost);
                    deletePost($(newPost).find('.delete-post-button'));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM 

    let newPostDom = function(post,user_name){
        return $(`<li id="post-${ post._id}">
                    <p>
                    <small>
                        <a
                        class="delete-post-button"
                        href="/posts/destroy/${post._id}"
                        style="color: black"
                        >X</a>
                    </small>
                    ${post.content}
                    <br />
                    <small> ${user_name}</small>
                    </p>
                    
                    <div class="post-comment">
                 
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="add comment here..." />
                            <input type="hidden" name="post" value="${post._id}" />
                            <input type="submit" value="add comment" />
                        </form>

                        <div class="post-comments-list">
                            <ul class="post-comments-${post._id}">

                            </ul>
                        </div>
                   
                    </div>
                </li>
      `);
    };


    //method to delete a post from DOM

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    createPost();
}
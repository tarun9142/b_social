{
    // method to create a post using AJAX 
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create post in DOM 

    let newPostDom = function(post){
        return $(`<li id="post${ post._id}">
                    <p>
                
                    <small>
                        <a
                        class="post-delete-button"
                        href="/posts/destroy/${post.id}"
                        style="color: black"
                        >X</a
                        >
                    </small>
                    ${post.content}
                    <br />
                    <small> ${post.user.name}</small>
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


    createPost();
}
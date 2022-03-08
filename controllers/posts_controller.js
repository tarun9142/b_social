const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        let user = await User.findById(post.user);
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    user_name: user.name
                },
                message: "post created!"
            });
        }
        req.flash('success','posted successfully');
        return res.redirect('back');
    } catch (err) {
        req.flash('error','error posting');
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:'post deleted'
                });
            }

            req.flash('success','successfully deleted post and related comments');
           return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }    
    } catch (error) {
        req.flash('error','error deleting post');
        return res.redirect('back');
    }
    
}
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','successfully posted');
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
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if (err) {
            console.log('error finding post while posting comment');
            return;
        }

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            },function(err,comment){
                if (err) {
                    console.log('error posting comment');
                    return;
                }

                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    });
}
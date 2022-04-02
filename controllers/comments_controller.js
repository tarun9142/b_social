const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            });

            post.comments.push(comment);
            post.save();

            let newcomment = await comment.populate('user','name email');
            //commentsMailer.newComment(newcomment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in sending to the queue',err);
                    return;
                }else{
                    console.log('job enqueued', job.id);
                }
            })

            req.flash('success','added comment successfully');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        req.flash('error','error commenting on post');
        res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success','successfully removed comment from the related post');
            return res.redirect('back');
        } else {
            req.flash('error','you cannot delete this comment');
            return res.redirect('back');
        }
    } catch (error) {
        if (error) {
            req.flash('error','error deleting comment');
            return res.redirect('back');
        }
    }
}
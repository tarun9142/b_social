const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home',
            {
                title: 'b_social | home',
                posts: posts,
                all_users: users
            }
        );
    } catch (error) {
        console.log('error', error);
        return;
    }
}
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'user profile'
    });
}

module.exports.posts = function(req,res){
    return res.end('<h1>posts</h1>');
}
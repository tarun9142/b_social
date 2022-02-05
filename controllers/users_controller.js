module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'user profile'
    });
}

module.exports.posts = function(req,res){
    return res.end('<h1>posts</h1>');
}

// render sign up page 
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'sign Up'
    });
}

// render sign in page 
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'sign In'
    });
}
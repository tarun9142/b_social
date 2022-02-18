const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'user profile',
            user_profile:user
    })
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('unauthorized');
    }
}

module.exports.posts = function(req,res){
    return res.end('<h1>posts</h1>');
}

// render sign up page 
module.exports.signUp = function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'sign Up'
    });
}

// render sign in page 
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'sign In'
    });
}

// get the sign up data  
module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if (err) {
            console.log('error in finding user in signing up'); return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if (err) {
                    console.log('error in creting user while signing up'); return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}

// sign in and create session for the user 

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// kill session for signout 

module.exports.killSession = function(req,res){
    req.logout();
    
    return res.redirect('/');
}
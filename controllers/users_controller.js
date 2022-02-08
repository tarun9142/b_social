const { redirect } = require('express/lib/response');
const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if (err) {
                console.log('error rendering profile page');
                return res.redirect('back');
            }
            if(user){
                return res.render('user_profile',{
                    title:'user profile',
                    user:user
                });
            }
            return res.redirect('users/sign-in');
        })
    }else{
        return res.redirect('back');
    }
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
                    console.log('error in creating user while signing up'); return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}


// sign in and create a session for the user 
module.exports.createSession = function(req,res){
    User.findOne({email:req.body.email}, function(err,user){
        if (err) {
            console.log('error finding user while signing in')
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user._id);
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.killSession = function(req,res){
    if(req.cookies.user_id){
        req.cookies.user_id = '';
        return res.redirect('/users/sign-in');
    }
}
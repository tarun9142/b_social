const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'user profile',
            user_profile:user
    })
    });
}

module.exports.update = async function(req,res){
    if (req.user.id == req.params.id){

        try {
            let user = await  User.findById(req.params.id);

            User.uploadAvatar(req,res,function(err){
                if(err){
                    console.log('****multer error',err);
                }

                user.email = req.body.email;
                user.name = req.body.name;
                
                if(req.file){
                    user.avatar = User.avatarPath + '/' + req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            })
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
    }else{
        req.flash('error',"you don't have permission to update this profile");
        return res.status(401).send('unauthorized');
    }
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','profile updated successfully');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error',"you don't have permission to update this profile");
    //     return res.status(401).send('unauthorized');
    // }
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
        req.flash('error','passwords does not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if (err) {
            req.flash('error',err);
            return res.redirect('back');
        }

        if(!user){
            User.create(req.body,function(err,user){
                if (err) {
                    req.flash('error','error creating user');
                    return res.redirect('back');
                }
                req.flash('success','user created successfully | sign in now');
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash('error','this email is already registered try another');
            return res.redirect('back');
        }
    })
}

// sign in and create session for the user 

module.exports.createSession = function(req,res){
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

// kill session for signout 

module.exports.killSession = function(req,res){
    req.logout();
    req.flash('success','logged out successfully');
    return res.redirect('/');
}
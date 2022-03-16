const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');



passport.use(new googleStrategy({
        clientID: "123938202496-t02sl53t63k30dk79giknf3vvs6sbshv.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy passport',err);
                return;
            }
            console.log(profile);

            if(suer){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in google strategy passport',err);
                        return;
                    }

                    return done(null, user);
                })
            }

        })
    }
));

module.exports = passport;
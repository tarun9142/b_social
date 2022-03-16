const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email:req.body.email});
        
        if(!user || user.password != req.body.password){
            return res.status(422),json({
                message: 'invalid username\password'
            })
        }

        return res.json(200,{
            message: 'sign in successfully, here is your token keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'bsocial',{expiresIn: '100000'})
            }
        });
    } catch (error) {
        console.log('******',error);
        return res.status(500).json({
            message: 'internal server error'
        });        
    }
}
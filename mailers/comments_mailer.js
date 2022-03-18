const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    nodeMailer.transporter.sendMail({
        from: 'tarun kumar',
        to:comment.user.email,
        subject: 'new comment published',
        html: '<h1>new comment posted</h1>'
    },(err,info) => {
        if(err){
            console.log('error in sending mail',err);
            return;
        }

        console.log('mail delivered',info);
        return;
    })
}
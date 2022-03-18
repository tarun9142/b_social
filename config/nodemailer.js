const nodemailer =   require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'krpande8@gmail.com',
        pass:'tarunmkumar123'
    }
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/emails', relativePath), 
        data, 
        function(err,template){
            if(err){
                console.log('error rendering template');
                return;
            }

            mailHTML = template;
        }
    )
        
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
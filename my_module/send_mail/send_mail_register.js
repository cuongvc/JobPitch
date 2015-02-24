var nodemailer         = require('nodemailer');
var fs                 = require('fs');
var Users              = require('./../../models/users');


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'campcoders@gmail.com',
        pass: 'Coc@123456'
    }
});

module.exports          =   function(email, username){
    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var send_mail_register_html = __dirname + 'send_mail_register.html';

    var content = '<p>Dear ' + username  + ', Welcome to JobPitch! <br> Please send us an email to campcoders@gmail.com<br>Campcoders Team</p>';

    // fs.readFile(send_mail_register_html, function (err, html) {
    //     if (err) {
    //         throw err; 
    //     }       
        var mailOptions = {
            from: 'campcoders@gmail.com', // sender address
            to: [email],
            subject: 'Register success JobPitch',           // Subject line
            text: content,                 // plaintext body
            html: content
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    // });


}


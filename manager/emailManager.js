const nodemailer = require("nodemailer");


const emailManager = async(to, subject, text, html) => 
    {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0fbbb4ecafe8af",
              pass: "065504b9c8add1"
            }
          });


          //sending mail to the newly created users 
          await transport.sendMail(
            {
                to: to,
                from:"@infoexpensetracker.com",
                subject: subject,
                text: text,
                html: html
            })
    }


    module.exports = emailManager;
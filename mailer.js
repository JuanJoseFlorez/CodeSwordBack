const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_AUTOMATICO, // generated ethereal user
      pass: process.env.EMAIL_CONTRASENA, // generated ethereal password
    },
});

transporter.verify().then(() =>{
    console.log(`Ready for send mails`)
})

exports.transporter = transporter
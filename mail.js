var nodemailer = require('nodemailer');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'LMS@gmail.com',
    pass: '123'
  }
});

var mailOptions = {
  from: 'LMS@gmail.com',
  to: 'shahindahemdan132@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
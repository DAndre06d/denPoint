import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
    },
  });

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

export default sendEmail
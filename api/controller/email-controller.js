const mailer = require('nodemailer');

const email = 'qacinema.earth@gmail.com';

const transporter = mailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: email,
        pass: 'adm!n123'
    }
})

module.exports = {
    sendEmail: async (req, res, next) => {

        var mailOptions = {
            from: email,
            to: email, // Would use management email here
            subject: `Customer message: ${req.body.subject}`,
            text: `Name: ${req.body.firstName} ${req.body.lastName}\nEmail: ${req.body.email}\nMessage:\n${req.body.message}`
        };

        transporter.verify().then().catch(error => next(error));

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                next(error);
            } else {
                res.status(200).send(`Email sent: ${info.response}`)
            }
        });
    }
}
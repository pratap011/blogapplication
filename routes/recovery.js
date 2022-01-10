const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const recovery = express.Router();
const db = require('../db');
const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,

}
recovery.use(cors(corsOptions))
recovery.use(bodyParser.json())

recovery.post("/", (req, res) => {
    var password;
    db.query(`SELECT password FROM auth_users WHERE email='${req.body.email}'`, (err, result) => {
        if (err) throw err;
        else {

            password = result[0].password

        }
    })
    require('deasync').sleep(100);

    const smtpTrans = nodemailer.createTransport({
        host: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    })

    // Specify what the email will look like
    const mailBody = {
        from: 'pratapsimha01@gmail.com', // This is ignored by Gmail
        to: `${req.body.email}`,
        text: `Your password is ${password}`
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailBody, (error, response) => {
        if (error) {
            res.send(error); // Show a page indicating failure
        }
        else {
            res.send({ message: "Success" }) // Show a page indicating success
        }
    })

})

module.exports = recovery;
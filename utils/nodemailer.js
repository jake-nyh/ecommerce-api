const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : process.env.SENDER_MAIL,
      pass : process.env.MAIL_PASSWORD
    }
  })

module.exports = transporter
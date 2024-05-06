const nodemailer = require('nodemailer');

class NodemailerServices {
  constructor() {}

  async sendEmail(payload) {
    try {
      let account = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      await transporter.sendMail({
        from: 'development@correo.com', // sender address
        to: payload.email, // list of receivers
        subject: payload.subject, // Subject line
        text: payload.text, // plain text body
        // html: '<b>Hello world?</b>', // html body
      });

      return;
    } catch (error) {}
  }
}

module.exports = new NodemailerServices();

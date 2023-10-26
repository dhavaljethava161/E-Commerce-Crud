import nodeMailer from "nodemailer";
import { config } from "../config";

export const emailService = (data) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.adminCredentials.email,
      pass: config.adminCredentials.pass,
    },
  });
  return transporter.sendMail({
    from: "test@gmail.com",
    to: data.email,
    subject: data.subject,
    text: data.text,
  });
};

const client = require("twilio")(config.twilio.key, config.twilio.token);

export const sendOTP = (user) => {
  const otp = Math.random().toFixed(4).split(".")[1];

  client.messages
    .create({
      body: `Your otp is ${otp}`,
      from: `+17177455069`,
      to: `+91${user.number}`,
    })
    .then((message) => {
      emailService({
        email: user.email,
        subject: "otp for login",
        text: `Your one time password is ${otp}`,
      });
    });
  return otp;
};

export const updateMessage = (data) => {
  client.messages
    .create({
      body: "Your order has been cancel",
      from: "+17177455069",
      to: `+91${data.number}`,
    })
    .then(() => {
      emailService({
        email: data.email,
        subject: "order cancellation",
        text: "Your order has been cancel",
      });
    });
};

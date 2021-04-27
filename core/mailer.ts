import * as nodemailer from "nodemailer";

const options = {
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT || 2525),
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

let transporter = nodemailer.createTransport(options);

export default transporter;

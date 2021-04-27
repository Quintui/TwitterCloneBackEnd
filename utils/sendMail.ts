import mailer from "../core/mailer";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

interface sendMailInterface {
  emailFrom: string;
  emailTo: string;
  subject: string;
  html: string;
  callback?: (error: Error | null, info: SentMessageInfo) => void;
}

export const sendMail = (
  { emailFrom, emailTo, subject, html }: sendMailInterface,
  callback?: (error: Error | null, info: SentMessageInfo) => void
) => {
  mailer.sendMail(
    {
      from: emailFrom,
      to: emailTo,
      subject: subject,
      html: html,
    },
    callback ||
      function (error: Error | null, info: SentMessageInfo) {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
        }
      }
  );
};

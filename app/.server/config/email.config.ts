import {createTransport} from "nodemailer";
import {APP_NAME, SMTP_PASSWORD, SMTP_USERNAME} from "./env.config";
import {verificationEmailTemplate} from "~/.server/email.template";


const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
})

const sendVerificationEmail = async (email: string , code: string) => {

    const mailOptions = {
        from: SMTP_USERNAME,
        to: email,
        subject: APP_NAME + ' - Verify Your Email',
        html: verificationEmailTemplate({ appName: APP_NAME! , code })
    }

    await transporter.sendMail(mailOptions)
}

export { sendVerificationEmail }
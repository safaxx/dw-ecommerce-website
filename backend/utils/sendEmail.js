import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })
    const resetPswrdMessage = `To reset your password click on the link below: \n${options.resetPswrdUrl} \nIf you didn't request for a password reset, you can safely ignore this email.`;

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email, 
        subject: options.subject,
        text: resetPswrdMessage 
    }

    await transporter.sendMail(mailOptions);
}
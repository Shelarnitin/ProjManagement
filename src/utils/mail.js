import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link:"https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "shelarnitin399@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed siliently. Make sure that you have MAILTRAP credentials in the .env file");
        console.error("Error: ", error)
    }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we`are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#22bc66",
                    text: "verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need help, or have questions? Just replay to this email, w`ed love to help"
        },
    };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "we got a request to rerset the password of your account.",
            action: {
                instructions: "To reset your password click on the following button or link",
                button: {
                    color: "#22bc66",
                    text: "Reset password",
                    link: passwordResetUrl
                },
            },
            outro: "Need help, or have questions? Just replay to this email, w`ed love to help"
        },
    };
};

export{
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}
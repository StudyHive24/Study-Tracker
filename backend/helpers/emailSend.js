import nodeMailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
import hbs from 'nodemailer-express-handlebars'
import { fileURLToPath } from 'node:url'
import { extname } from 'node:path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const emailSend = async (
    subject,
    send_to,
    send_from,
    reply_to,
    template,
    name,
    code
) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const handlebarsOptions = {
        viewEngine: {
            extname: '.handlebars',
            partialsDir: path.resolve(__dirname, '../views/'),
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, '../views/'),
        extname: '.handlebars'
    }

    transporter.use('compile', hbs(handlebarsOptions))

    const mailOptions = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        template: template,
        context: {
            name: name,
            code: code
        }
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Message send: %s', info.messageId)
        return info
    } catch (error) {
        console.log('Error sending the email: ', error)
        throw error
    }
}

export default emailSend
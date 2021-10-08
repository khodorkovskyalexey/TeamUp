const nodemailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../configs/env')

class EmailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: `TeamUp <${SMTP_USER}>`,
            to,
            subject: 'Активация аккаунта на ' + API_URL,
            text: '',
            html: getHtml(link)
        })
    }
}

function getHtml(link) {
    const source = fs.readFileSync('public/pages/email_verification.html', 'utf-8').toString()
    const template = handlebars.compile(source)
    const replacements = {
        link,
    }
    return template(replacements)
}

module.exports = new EmailService()

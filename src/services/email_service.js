const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const fs = require('fs')
const handlebars = require('handlebars')
const token_service = require('./token_service')

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL, CLIENT_URL } = require('../configs/env')

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

    async sendActivationMail(email, name, password) {
        const hash_password = await bcrypt.hash(password, 10)
        const activate_token = token_service.generateEmailToken({ email, name, hash_password })
        const link = `${CLIENT_URL}/activate/${activate_token}`

        await this.transporter.sendMail({
            from: `TeamUp <${SMTP_USER}>`,
            to: email,
            subject: `Активация аккаунта на ${API_URL}`,
            text: '',
            html: getEmailHtml(link)
        })
    }
}

function getEmailHtml(link) {
    const source = fs.readFileSync('public/pages/email_verification.html', 'utf-8').toString()
    const template = handlebars.compile(source)
    const replacements = {
        main_page: CLIENT_URL,
        link
    }
    return template(replacements)
}

module.exports = new EmailService()

const email_service = require('../services/email_service')

class EmailController {
    async registration(ctx) {
        const { email, name, password } = ctx.request.body
        await email_service.sendActivationMail(email, name, password)
        ctx.status = 200
    }
}

module.exports = new EmailController()
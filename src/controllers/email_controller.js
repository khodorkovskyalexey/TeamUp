const { validationResults } = require('koa-req-validation')
const auth_error = require('../exceptions/auth_error')
const email_service = require('../services/email_service')

class EmailController {
    async registration(ctx) {
        if(validationResults(ctx).hasErrors()) {
            throw auth_error.BadRequest('Почта или пароль имеют неверный формат')
        }

        const { email, name, password } = ctx.request.body
        await email_service.sendActivationMail(email, name, password)
        ctx.status = 200
    }
}

module.exports = new EmailController()
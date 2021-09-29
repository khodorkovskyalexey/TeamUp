const { validationResults } = require('koa-req-validation')
const AuthError = require('../exceptions/auth_error')
const UserService = require('../services/user_service')

class UserController {
    async registration(ctx) {
        if(validationResults(ctx).hasErrors()) {
            throw AuthError.UnauthorizedError()
        }
        const { email, name, password } = ctx.request.body
        const user = await UserService.registration(email, name, password)
        ctx.cookies.set("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        ctx.body = user
    }
}

module.exports = new UserController()
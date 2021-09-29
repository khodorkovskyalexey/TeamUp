const { validationResults } = require('koa-req-validation')
const { JWT_REFRESH_COOKIE_MS } = require('../configs/jwt_config')
const AuthError = require('../exceptions/auth_error')
const UserService = require('../services/user_service')

class UserController {
    async registration(ctx) {
        if(validationResults(ctx).hasErrors()) {
            throw AuthError.BadRequest('Почта или пароль имеют неверный формат')
        }
        const { email, name, password } = ctx.request.body
        const userData = await UserService.registration(email, name, password)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async login(ctx) {
        const { email, password } = ctx.request.body
        const userData = await UserService.login(email, password)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async logout(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        console.log(refreshToken)
        ctx.cookies.set('refreshToken', '')
        await UserService.logout(refreshToken)
        ctx.status = 200
    } 

    async refresh(req, res, next) {
        
    }
}

module.exports = new UserController()
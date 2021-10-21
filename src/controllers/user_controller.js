const { JWT_REFRESH_COOKIE_MS } = require('../configs/jwt_config')
const user_service = require('../services/user_service')

const cookie = require('node-cookie')

class UserController {
    async activate(ctx) {
        const { token } = ctx.params
        const userData = await user_service.activate(token)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async login(ctx) {
        const { email, password } = ctx.request.body
        const userData = await user_service.login(email, password)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async logout(ctx) {
        const refreshToken = cookie.get('refreshToken')
        await user_service.logout(refreshToken)
        cookie.create(ctx.res, 'refreshToken', '')
        ctx.status = 200
    } 

    async refresh(ctx) {
        const refreshToken = cookie.get('refreshToken')
        const userData = await user_service.refresh(refreshToken)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }
}

module.exports = new UserController()
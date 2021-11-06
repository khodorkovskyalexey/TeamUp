const { JWT_REFRESH_COOKIE_MS } = require('../configs/jwt_config')
const auth_service = require('../services/auth_service')

const cookie = require('node-cookie')

class UserController {
    async activate(ctx) {
        const { token } = ctx.params
        const userData = await auth_service.activate(token)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true, path: '/' })
        ctx.body = userData
    }

    async login(ctx) {
        const { email, password } = ctx.request.body
        const userData = await auth_service.login(email, password)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true, path: '/' })
        ctx.body = userData
    }

    async logout(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        await auth_service.logout(refreshToken)
        cookie.create(ctx.res, 'refreshToken', '', { httpOnly: true, path: '/' })
        ctx.status = 200
    } 

    async refresh(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        const userData = await auth_service.refresh(refreshToken)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true, path: '/' })
        ctx.body = userData
    }
}

module.exports = new UserController()
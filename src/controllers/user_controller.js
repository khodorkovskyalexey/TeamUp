const { JWT_REFRESH_COOKIE_MS } = require('../configs/jwt_config')
const user_service = require('../services/user_service')

class UserController {
    async activate(ctx) {
        const { token } = ctx.params
        const userData = await user_service.activate(token)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async login(ctx) {
        const { email, password } = ctx.request.body
        const userData = await user_service.login(email, password)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async logout(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        await user_service.logout(refreshToken)
        ctx.cookies.set('refreshToken', '')
        ctx.status = 200
    } 

    async refresh(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        const userData = await user_service.refresh(refreshToken)
        ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }
}

module.exports = new UserController()
const { JWT_REFRESH_COOKIE_MS } = require('../configs/jwt_config')
const user_service = require('../services/user_service')

const cookie = require('node-cookie')

class UserController {
    async activate(ctx) {
        const { token } = ctx.params
        const userData = await user_service.activate(token)
        console.log(userData.refreshToken);
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        // cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        // ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async login(ctx) {
        const { email, password } = ctx.request.body
        const userData = await user_service.login(email, password)
        console.log(userData.refreshToken);
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        // ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    async logout(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken')
        await user_service.logout(refreshToken)
        console.log(userData.refreshToken);
        cookie.create(ctx.res, 'refreshToken', '', { httpOnly: true })
        // ctx.cookies.set('refreshToken', "", { httpOnly: true })
        ctx.status = 200
    } 

    async refresh(ctx) {
        console.log(ctx.cookies.get('refreshToken'))
        const refreshToken = ctx.cookies.get('refreshToken')
        const userData = await user_service.refresh(refreshToken)
        console.log(userData.refreshToken);
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        // ctx.cookies.set('refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    get(ctx) {
        ctx.body = [ 
            ctx.cookies.get('refreshToken')
            // cookie.get(ctx.request, 'user')
        ]

        // ctx.redirect('https://sun9-87.userapi.com/impf/c639728/v639728163/6c2c/eTyC7rSb8bs.jpg?size=1215x2160&quality=96&sign=d45940d06fc3eb1058e5b52f4713b23a&type=album')

        // ctx.body = ctx.cookies.get('refreshToken')
    }

    post(ctx) {
        // cookie.create(ctx.res, 'user', ctx.request.body["user"])
        ctx.status = 200
    }
}

module.exports = new UserController()
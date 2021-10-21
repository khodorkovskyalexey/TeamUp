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
        const refreshToken = cookie.get(ctx.request, 'refreshToken')
        await user_service.logout(refreshToken)
        cookie.create(ctx.res, 'refreshToken', '')
        ctx.status = 200
    } 

    async refresh(ctx) {
        const refreshToken = cookie.get(ctx.request, 'refreshToken')
        const userData = await user_service.refresh(refreshToken)
        cookie.create(ctx.res, 'refreshToken', userData.refreshToken, { maxAge: JWT_REFRESH_COOKIE_MS, httpOnly: true })
        ctx.body = userData
    }

    get(ctx) {
        // ctx.body = [ 
        //     cookie.get(ctx.request, 'refreshToken'), 
        //     cookie.get(ctx.request, 'user')
        // ]

        ctx.body = "Salam alleykym"
        // ctx.redirect('https://sun9-21.userapi.com/impf/trYsV08DCFITIZH7hER5rQ6Svk824PtTIhq-iw/ekeVQ7JsKBQ.jpg?size=440x720&quality=96&sign=070c89e0df1067764eb74fdced459dec&type=album')

        // ctx.body = ctx.cookies.get('refreshToken')
    }

    post(ctx) {
        cookie.create(ctx.res, 'user', ctx.request.body["user"])
        ctx.status = 200
    }
}

module.exports = new UserController()
const router = require('koa-router')()
const cookie = require('node-cookie')
const { User, Token } = require('../database/db')
const user_service = require('../services/user_service')

const auth_router = require('./auth_router')

router
    .use(auth_router.routes())
    .get('/users', async ctx => {
        ctx.body = await User.findAll({ include: [Token] })
    })
    .get('/tokens', async ctx => {
        ctx.body = await Token.findAll()
    })
    .get('/', ctx => {
        ctx.body = [ 
            cookie.get(ctx.request, 'refreshToken'), 
            cookie.get(ctx.request, 'user')
        ]
        // ctx.body = ctx.cookies.get('refreshToken')
    })
    .post('/', ctx => {
        cookie.create(ctx.res, 'user', ctx.request.body["user"])
        ctx.status = 200
    })

module.exports = router
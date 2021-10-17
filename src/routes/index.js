const router = require('koa-router')()

const auth_router = require('./auth_router')

router
    .use(auth_router.routes())
    .get('/', ctx => {
        ctx.body = ctx.cookies.get('refreshToken')
    })
    .post('/', ctx => {
        ctx.body = ctx.cookies.get('refreshToken')
    })

module.exports = router
const router = require('koa-router')()
const { User, Token } = require('../database/db')

const auth_router = require('./auth_router')

router
    .use(auth_router.routes())

    // dev routes
    .get('/users', async ctx => {
        ctx.body = await User.findAll({ include: [Token] })
    })

module.exports = router
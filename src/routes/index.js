const router = require('koa-router')()

const { User, Resume, Contact, Token } = require('../database/db')
const auth_router = require('./auth_router')
const profile_router = require('./profile_router')

router
    .use(auth_router.routes())
    .use(profile_router.routes())

    // dev routes
    .get('/users', async ctx => {
        ctx.body = await User.findAll({ include: [Token, Contact, Resume] })
    })

module.exports = router
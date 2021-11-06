const router = require('koa-router')()

const { User, Resume, Contact, Token } = require('../database/db')
const auth_router = require('./auth_router')
const profile_router = require('./profile_router')

router
    .use('/auth', auth_router.routes(), auth_router.allowedMethods())
    .use('/profile', profile_router.routes(), profile_router.allowedMethods())

    // dev routes
    .get('/users', async ctx => {
        ctx.body = await User.findAll({ include: [Token, Contact, Resume] })
    })

module.exports = router
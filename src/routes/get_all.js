const router = require('koa-router')()
const { User, Token } = require('../database/db')

router
    .get('/users', async ctx => {
        await User.findAll()
            .then(res => {
                ctx.body = res
            })
    })
    .get('/tokens', async ctx => {
        await Token.findAll()
            .then(res => {
                ctx.body = res
            })
    })

module.exports = router
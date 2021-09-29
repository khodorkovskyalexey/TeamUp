const router = require('koa-router')()
const { User } = require('../database/db')

router.get('/users', async ctx => {
    await User.findAll()
        .then(res => {
            ctx.body = res
        })
})

module.exports = router
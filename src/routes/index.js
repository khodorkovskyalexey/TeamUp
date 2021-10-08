const router = require('koa-router')()

const auth_router = require('./auth_router')

router
    .use(auth_router.routes())

module.exports = router
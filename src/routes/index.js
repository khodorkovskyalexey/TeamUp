const router = require('koa-router')()

const auth_router = require('./auth_router')
const get_all = require('./get_all')

router
    .use(auth_router.routes())
    .use(get_all.routes())

module.exports = router
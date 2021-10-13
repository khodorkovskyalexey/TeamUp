const router = require('koa-router')()

const auth_router = require('./auth_router')
const profile_router = require('./profile_router')

router
    .use(auth_router.routes())
    .use(profile_router.routes())

module.exports = router
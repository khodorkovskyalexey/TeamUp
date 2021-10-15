const router = require('koa-router')()
const auth_middleware = require('../middlewares/auth_middleware')
const profile_controller = require('../controllers/profile_controller')

router
    .put('/profile', auth_middleware, profile_controller.edit)

module.exports = router
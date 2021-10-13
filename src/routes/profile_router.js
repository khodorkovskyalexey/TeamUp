const router = require('koa-router')()
const auth_middleware = require('../middlewares/auth_middleware')
const profile_controller = require('../controllers/profile_controller')

router
    .use(auth_middleware)
    .get('/profile', profile_controller.getProfile)
    .put('/profile', profile_controller.edit)

module.exports = router
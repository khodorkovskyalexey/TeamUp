const router = require('koa-router')()
const auth_middleware = require('../middlewares/auth_middleware')
const avatar = require('../middlewares/download_avatar_middleware')
const profile_controller = require('../controllers/profile_controller')

router
    .get('/', auth_middleware, profile_controller.getOwnProfile)
    .get('/:user_id', profile_controller.getProfileById)
    .put('/', auth_middleware, profile_controller.edit)
    .post('/avatar', auth_middleware, avatar, profile_controller.set_avatar)

module.exports = router
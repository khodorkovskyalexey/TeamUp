const router = require('koa-router')()
const auth_middleware = require('../middlewares/auth_middleware')
const check_owner_middleware = require('../middlewares/user_is_owner_middleware')
const project_controller = require('../controllers/project_controller')
const validate_user_middleware = require('../middlewares/validate_user_middleware')

router
    .post('/', auth_middleware, project_controller.create)
    .get('/:project_id', validate_user_middleware, project_controller.getProjectById)
    .del('/:project_id', auth_middleware, check_owner_middleware, project_controller.delete)
    .put('/:project_id', auth_middleware, check_owner_middleware, project_controller.update)

module.exports = router
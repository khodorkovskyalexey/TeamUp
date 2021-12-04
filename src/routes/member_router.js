const router = require('koa-router')()
const check_access = require('../middlewares/access_to_user_project_data_middleware')
const auth_middleware = require('../middlewares/auth_middleware')
const member_controller = require('../controllers/member_controller')

router
    .get('/', member_controller.getAll)
    .get('/:user_id', member_controller.getOne)
    .put('/:user_id', auth_middleware, check_access, member_controller.update)
    .del('/:user_id', auth_middleware, check_access, member_controller.delete)

module.exports = router
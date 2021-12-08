const router = require('koa-router')()
const auth_middleware = require('../middlewares/auth_middleware')
const check_owner_middleware = require('../middlewares/user_is_owner_middleware')
const project_controller = require('../controllers/project_controller')
const validate_user_middleware = require('../middlewares/validate_user_middleware')

const candidate_router = require('./candidate_router')
const member_router = require('./member_router')

router
    .post('/', auth_middleware, project_controller.create)
    .get('/', project_controller.getAll)
    .get('/my', auth_middleware, project_controller.getOwnProjects)
    .get('/:project_id', validate_user_middleware, project_controller.getProjectById)
    .del('/:project_id', auth_middleware, check_owner_middleware, project_controller.delete)
    .put('/:project_id', auth_middleware, check_owner_middleware, project_controller.update)
    //imports
    .use('/:project_id/candidate', candidate_router.routes(), candidate_router.allowedMethods())
    .use('/:project_id/member', member_router.routes(), member_router.allowedMethods())

module.exports = router
const router = require('koa-router')()
const check_owner = require('../middlewares/user_is_owner_middleware')
const auth_middleware = require('../middlewares/auth_middleware')
const user_isnt_member = require('../middlewares/user_isnt_member_middleware')
const user_is_member = require('../middlewares/check_member_middleware')
const candidate_controller = require('../controllers/candidate_controller')

router
    .get('/', auth_middleware, check_owner, candidate_controller.getAllCandidates)
    .get('/:user_id', auth_middleware, check_owner, candidate_controller.getOneCandidate)
    .post('/', auth_middleware, user_isnt_member, candidate_controller.askToTeam)
    .post('/:user_id', auth_middleware, check_owner, user_isnt_member, candidate_controller.inviteCandidate)
    .del('/:user_id', auth_middleware, user_is_member, candidate_controller.delete)

module.exports = router
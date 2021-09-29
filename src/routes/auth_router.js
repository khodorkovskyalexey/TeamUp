const router = require('koa-router')()
const userController = require('../controllers/user_controller')
const { body } = require('koa-req-validation')

router.post('/register',
    body("email").isEmail().build(),
    body('password').isLength({ min: 8 }).build(),
    userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router
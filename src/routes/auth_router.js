const router = require('koa-router')()
const user_controller = require('../controllers/user_controller')
const email_controller = require('../controllers/email_controller')
const { body } = require('koa-req-validation')

//middlewares
const email_is_unique = require('../middlewares/email_is_unique')

router.post('/register',
    body("email").isEmail().build(),
    body('password').isLength({ min: 8 }).build(),
    email_is_unique,
    email_controller.registration
)
router.get('/activate/:token', user_controller.activate)
router.post('/login', user_controller.login)
router.post('/logout', user_controller.logout)
router.get('/refresh', user_controller.refresh)

.get('/check', user_controller.get)
.post('/check', user_controller.post)

module.exports = router
const router = require('koa-router')()
const auth_controller = require('../controllers/auth_controller')
const email_controller = require('../controllers/email_controller')
const { body } = require('koa-req-validation')

//middlewares
const email_is_unique = require('../middlewares/email_is_unique')
const auth_validate = require('../middlewares/auth_validate_middleware')

router
    .post('/register',
        body("email").isEmail().withMessage("Почта должна быть указана в верном формате").build(),
        body('password').isLength({ min: 8 }).withMessage("Пароль должен содержать не менее 8 символов").build(),
        body("name").isLength({ min: 1 }).withMessage("Имя не должно быть пустым").build(),
        auth_validate,
        email_is_unique,
        email_controller.registration
    )
    .post('/login',
        body("email").isEmail().withMessage("Почта должна быть указана в верном формате").build(),
        body('password').isLength({ min: 8 }).withMessage("Пароль должен содержать не менее 8 символов").build(),
        auth_validate,
        auth_controller.login
    )
    .get('/activate/:token', auth_controller.activate)
    .post('/logout', auth_controller.logout)
    .get('/refresh', auth_controller.refresh)

module.exports = router
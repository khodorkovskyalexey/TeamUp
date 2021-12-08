const router = require('koa-router')();
const users_controller = require('../controllers/users_controller');

router
    .get('/', users_controller.getAll)

module.exports = router;
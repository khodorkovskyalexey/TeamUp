const user_service = require("../services/user_service");

class UserController {
    async getAll(ctx) {
        ctx.body = await user_service.findAll();
    }
}

module.exports = new UserController();
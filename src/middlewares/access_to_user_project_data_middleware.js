const AuthError = require('../exceptions/auth_error');
const check_owner = require('./user_is_owner_middleware')

module.exports = async function (ctx, next) {
    try {
        await check_owner(ctx, next);
    } catch (error) {
        if(error instanceof AuthError) {
            const user_id = ctx.request.user['id'];
            const member_id = ctx.params.user_id;
            
            if(user_id !== Number(member_id)) {
                error.message = "Пользователь не имеет доступа к редактированию этих данных"
                throw error;
            }

            await next();
        } else {
            throw error;
        }
    }
}
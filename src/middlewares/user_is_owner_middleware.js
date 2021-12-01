const { Member } = require('../database/db');
const AuthError = require('../exceptions/auth_error');

module.exports = async (ctx, next) => {
    const user_id = ctx.request.user['id'];
    const { project_id } = ctx.params;

    const member = await Member.findOne({ where: { userId: user_id, projectId: project_id } });
    const isOwner = member?.isOwner;
    if(!member || !isOwner) {
        throw AuthError.ForbiddenError('Пользователь не является создателем проекта');
    }

    await next();
}
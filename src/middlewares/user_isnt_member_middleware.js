const { Member } = require('../database/db');
const DatabaseError = require('../exceptions/db_queries');

module.exports = async (ctx, next) => {
    const { project_id } = ctx.params;
    const user_id = ctx.params.user_id || ctx.request.user.id

    const member = await Member.findOne({ where: { userId: user_id, projectId: project_id } });
    if(member) {
        throw DatabaseError.BadRequest('Пользователь уже является участником команды');
    }

    await next();
}
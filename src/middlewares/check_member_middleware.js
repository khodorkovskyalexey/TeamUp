const { Member, Candidate } = require('../database/db');
const DatabaseError = require('../exceptions/db_queries');

module.exports = async (ctx, next) => {
    const { project_id } = ctx.params;
    const user_id = ctx.request.user.id

    const owner = await Member.findOne({ where: { userId: user_id, projectId: project_id, isOwner: true } });
    const candidate = await Candidate.findOne({ where: { userId: user_id, projectId: project_id } });
    if(!owner && !candidate) {
        throw DatabaseError.BadRequest('Пользователь уже является участником команды');
    }

    await next();
}
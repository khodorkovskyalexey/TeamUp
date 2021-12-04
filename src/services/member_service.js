const { Member, User } = require('../database/db');

class MemberService {
    async findAll(projectId, options = {}) {
        return await Member.findAll({ where: { projectId }, include: {
            model: User,
            attributes: ['name', 'avatar', 'id'],
        },  ...options });
    }

    async findByUserId(userId, projectId, options = {}) {
        return await Member.findOne({ where: { projectId, userId }, include: {
            model: User,
            attributes: ['name', 'avatar', 'id'],
        }, ...options });
    }

    async update(userId, projectId, member_dto) {
        await Member.update(member_dto, { where: { userId, projectId } });
        return await Member.findOne({ where: { userId, projectId } });
    }

    async delete(userId, projectId) {
        await Member.destroy({ where: { userId, projectId } });
    }
}

module.exports = new MemberService();
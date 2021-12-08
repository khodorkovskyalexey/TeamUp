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

    async getOwnerByProjectId(projectId, options = {}) {
        const owner = await Member.findOne({ where: { projectId, isOwner: true }, attributes: ['userId'] });
        return await User.findOne({ where: { id: owner.userId }, ...options });
    }
}

module.exports = new MemberService();
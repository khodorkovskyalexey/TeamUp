const { User, Project, Member } = require('../database/db')
const ProjectDto = require('../dtos/project_dto')
const DatabaseError = require('../exceptions/db_queries')

class ProjectService {
    async create(user_id, project_dto) {
        const user = await User.findByPk(user_id);
        const member = await user.createMember({ isOwner: true });
        const created_project = await Project.create(project_dto);
        await member.setProject(created_project);

        return created_project;
    }

    async getById(id) {
        const project = await Project.findByPk(id);
        if(!project) {
            throw DatabaseError.BadRequest(`Project with id=${id} not found`);
        }

        const member = await project.getMembers({
            attributes: ['role', 'isOwner'],
            include: {
                model: User,
                attributes: ['name', 'avatar', 'id']
            }
        });

        const project_dto = new ProjectDto(project);
        return { ...project_dto, member };
    }

    async checkMember(userId, projectId) {
        const bad_answer = {
            isOwner: false,
            isMember: false
        }
        if(!userId) {
            return bad_answer;
        }
        const member = await Member.findOne({ where: { userId, projectId } });
        if(member) {
            bad_answer.isMember = true;
            bad_answer.isOwner = member.isOwner;
        }
        return bad_answer;
    }

    async update(project_id, project_dto) {
        await Project.update(project_dto, { where: { id: project_id } });
        return project_dto;
    }

    async delete(project_id) {
        return await Project.destroy({ where: { id: project_id } });
    }
}

module.exports = new ProjectService()
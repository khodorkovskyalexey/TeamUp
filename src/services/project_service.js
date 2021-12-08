const { User, Project, Member } = require('../database/db')
const ProjectDto = require('../dtos/project_dto');
const ProjectInProfileDto = require('../dtos/project_in_profile_dto');
const SearchedProjectDto = require('../dtos/searched_project_dto');
const member_service = require('./member_service');

class ProjectService {
    async findAll() {
        const projects = await Project.findAll({ attributes: ['id', 'title', 'slogan', 'looking_for'] });

        const projects_dto = projects.map(project => new SearchedProjectDto(project))
        await Promise.all(projects_dto.map(
            async project => project.owner = await member_service.getOwnerByProjectId(project.id, { attributes: ['id', 'name'] })
        ));

        return projects_dto;
    }

    async create(user_id, project_dto) {
        const user = await User.findByPk(user_id);
        const member = await user.createMember({ isOwner: true });
        const created_project = await Project.create(project_dto);
        await member.setProject(created_project);

        return created_project;
    }

    async getUserProjects(userId) {
        const projects_data = await Member.findAll({ where: { userId }, attributes: ['role', 'isOwner'], include: {
            model: Project,
            attributes: ['id', 'title', 'slogan']
        } });

        const projectsInProfileDto = projects_data.map(project => new ProjectInProfileDto(project));
        await Promise.all(
            projectsInProfileDto.map(async project_json => project_json.owner = await getOwnerName(project_json.project.id))
        );

        return projectsInProfileDto;
    }

    async getById(id) {
        const project = await Project.findByPk(id);
        if(!project) {
            throw DatabaseError.BadRequest(`Project with id=${id} not found`);
        }

        const members = await project.getMembers({
            attributes: ['role', 'isOwner'],
            include: {
                model: User,
                attributes: ['name', 'avatar', 'id']
            }
        });

        const project_dto = new ProjectDto(project);
        return { ...project_dto, members };
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

async function getOwnerName(projectId) {
    const owner_json = await Member.findOne({ where: { projectId, isOwner: true }, attributes: [],
        include: {
            model: User,
            attributes: ['name'],
        } });
    return owner_json.user;
}

module.exports = new ProjectService()
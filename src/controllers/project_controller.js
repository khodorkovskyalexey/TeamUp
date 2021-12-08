const project_service = require('../services/project_service')

const ProjectDto = require('../dtos/project_dto')

class ProjectController {
    async getOwnProjects(ctx) {
        const user_id = ctx.request.user['id'];

        const projects = await project_service.getUserProjects(user_id);

        ctx.body = projects;
    }

    async getProjectById(ctx) {
        const { project_id } = ctx.params;
        const user_id = ctx.request.user?.id;

        const project = await project_service.getById(project_id);
        const actual_user = await project_service.checkMember(user_id, project_id);
        const user = { ...actual_user, ...ctx.request.user }

        const { members } = project;
        project.members = undefined;

        ctx.body = { info: project, members, user };
    }

    async create(ctx) {
        const user_id = ctx.request.user['id'];
        const project_dto = new ProjectDto(ctx.request.body);

        const created_project = await project_service.create(user_id, project_dto);

        ctx.body = created_project;
    }

    async delete(ctx) {
        const { project_id } = ctx.params;
        await project_service.delete(project_id);
        ctx.body = 'Ok';
    }

    async update(ctx) {
        const { project_id } = ctx.params;
        const project_dto = new ProjectDto(ctx.request.body)
        ctx.body = await project_service.update(project_id, project_dto)
    }
}

module.exports = new ProjectController()
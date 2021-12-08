const MemberDto = require('../dtos/member_dto');
const member_service = require('../services/member_service');

class MemberController {
    async getOne(ctx) {
        const { project_id, user_id } = ctx.params;
        ctx.body = await member_service.findByUserId(user_id, project_id);
    }

    async getAll(ctx) {
        const { project_id } = ctx.params;
        ctx.body = await member_service.findAll(project_id);
    }

    async update(ctx) {
        const { project_id, user_id } = ctx.params;
        const member_dto = new MemberDto(ctx.request.body);
        ctx.body = await member_service.update(user_id, project_id, member_dto);
    }

    async delete(ctx) {
        const { project_id, user_id } = ctx.params;
        await member_service.delete(user_id, project_id);
        ctx.body = "Ok";
    }
}

module.exports = new MemberController();
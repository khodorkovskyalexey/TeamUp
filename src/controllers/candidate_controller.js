const candidate_service = require('../services/candidate_service')

class CandidateController {
    async askToTeam(ctx) {
        const { project_id } = ctx.params;
        const user_id = ctx.request.user?.id;
        const { message } = ctx.request.body;

        ctx.body = await candidate_service.askToTeam(user_id, project_id, message);
    }
    async inviteCandidate(ctx) {
        const { project_id, user_id } = ctx.params;
        const { message } = ctx.request.body;
        
        ctx.body = await candidate_service.inviteCandidate(user_id, project_id, message);
    }

    async getOneCandidate(ctx) {
        const { project_id, user_id } = ctx.params;
        ctx.body = await candidate_service.findCandidateByUserId(user_id, project_id);
    }

    async getAllCandidates(ctx) {
        const { project_id } = ctx.params;
        ctx.body = await candidate_service.findAllCandidates(project_id);
    }

    async delete(ctx) {
        const { project_id, user_id } = ctx.params;
        await candidate_service.delete(user_id, project_id);
        ctx.body = "Ok";
    }
}

module.exports = new CandidateController()
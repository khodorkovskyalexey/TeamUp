const { Candidate, Member } = require('../database/db')

class CandidateService {
    async findAll(projectId, options = {}) {
        return await Candidate.findAll({ ...options, where: { projectId } })
    }

    async findById(userId, projectId, options = {}) {
        return await Candidate.findOne({ ...options, where: { projectId, userId } })
    }

    async inviteCandidate(candidate_id, projectId, message = "") {
        return await this.addCandidate('isTeamOwnerAccept', candidate_id, projectId, message);
    }

    async askToTeam(candidate_id, projectId, message = "") {
        return await this.addCandidate('isUserAccept', candidate_id, projectId, message);
    }

    async delete(candidate_id, projectId) {
        await Candidate.destroy({ where: { userId: candidate_id, projectId } });
    }

    async checkAccept(candidate) {
        const result = {
            accepted: false,
            isTeamOwnerAccept: candidate.isTeamOwnerAccept,
            isUserAccept: candidate.isUserAccept
        }
        if(candidate.isTeamOwnerAccept && candidate.isUserAccept) {
            await this.candidateToMember(candidate);
            result.accepted = true;
        }
        return result;
    }

    async candidateToMember(candidate) {
        const { userId, projectId, id } = candidate;
        await Member.create({ userId, projectId });
        await Candidate.destroy({ where: { id } });
    }

    async addCandidate(acceptField, candidate_id, projectId, message = "") {
        const [candidate] = await Candidate.findOrCreate({ where: { userId: candidate_id, projectId } });
        candidate[acceptField] = true;
        candidate.message = message;
        const updatedCandidate = await candidate.save();
        return await this.checkAccept(updatedCandidate);
    }
}

module.exports = new CandidateService()
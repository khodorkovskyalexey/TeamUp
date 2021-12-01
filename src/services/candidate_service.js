const { Candidate, Member } = require('../database/db')

class CandidateService {
    async findAll(projectId, options = {}) {
        return await Candidate.findAll({ ...options, where: { projectId } })
    }

    async findById(userId, projectId, options = {}) {
        return await Candidate.findOne({ ...options, where: { projectId, userId } })
    }

    async inviteCandidate(candidate_id, projectId, message = "") {
        await Candidate.findOrCreate({ where: { userId: candidate_id, projectId } })
            .then(([candidate]) => {
                candidate.isTeamOwnerAccept = true;
                candidate.message = message;
                candidate.save()
                    .then(updatedCandidate => {
                        this.checkAccept(updatedCandidate);
                    })
            });
    }

    async askToTeam(candidate_id, projectId, message = "") {
        await Candidate.findOrCreate({ where: { userId: candidate_id, projectId } })
            .then(([candidate]) => {
                candidate.isUserAccept = true;
                candidate.message = message;
                candidate.save()
                    .then(updatedCandidate => {
                        this.checkAccept(updatedCandidate);
                    })
            });
    }

    async delete(candidate_id, projectId) {
        await Candidate.destroy({ where: { userId: candidate_id, projectId } });
    }

    async checkAccept(candidate) {
        if(candidate.isTeamOwnerAccept && candidate.isUserAccept) {
            await this.candidateToMember(candidate);
        }
    }

    async candidateToMember(candidate) {
        const { userId, projectId, id } = candidate;
        await Member.create({ userId, projectId });
        await Candidate.destroy({ where: { id } });
    }
}

module.exports = new CandidateService()
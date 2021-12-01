const { Candidate } = require('../database/db')

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
                if(candidate.isUserAccept) {
                    // принять заявку
                }
                candidate.isTeamOwnerAccept = true;
                candidate.message = message;
                candidate.save();
            });
    }

    async askToTeam(candidate_id, projectId, message = "") {
        await Candidate.findOrCreate({ where: { userId: candidate_id, projectId } })
            .then(([candidate]) => {
                console.log(candidate);
                if(candidate.isTeamOwnerAccept) {
                    // принять заявку
                }
                candidate.isUserAccept = true;
                candidate.message = message;
                candidate.save();
            });
    }

    async delete(candidate_id, projectId) {
        await Candidate.destroy({ where: { userId: candidate_id, projectId } });
    }
}

module.exports = new CandidateService()
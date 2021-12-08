const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Candidate = sequelize.define('candidate', {
    isTeamOwnerAccept: { type: Sequelize.BOOLEAN, defaultValue: false },
    isUserAccept: { type: Sequelize.BOOLEAN, defaultValue: false },
    message: { type: Sequelize.STRING },
})

module.exports = Candidate
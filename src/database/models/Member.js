const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Member = sequelize.define('member', {
    role: { type: Sequelize.STRING, defaultValue: "Работяга" },
    isOwner: { type: Sequelize.BOOLEAN, defaultValue: false },
})

module.exports = Member
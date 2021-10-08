const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Resume = sequelize.define('resume', {
    about_me: Sequelize.STRING,
    skills: Sequelize.STRING,
    searchable: { type: Sequelize.BOOLEAN, defaultValue: false },
})

module.exports = Resume
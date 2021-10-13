const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Resume = sequelize.define('resume', {
    profession: { type: Sequelize.STRING, defaultValue: "Готов к любой работе" },
    about_me: Sequelize.STRING,
    skills: Sequelize.STRING,
})

module.exports = Resume
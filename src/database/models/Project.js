const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Project = sequelize.define('project', {
    title: { type: Sequelize.STRING,  allowNull: false },
    logo: Sequelize.STRING,
    description: Sequelize.STRING,
    skills: Sequelize.STRING,
    slogan: Sequelize.STRING,
    searchable: { type: Sequelize.BOOLEAN, defaultValue: false },
})

module.exports = Project
const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Project = sequelize.define('project', {
    title: { type: Sequelize.STRING,  allowNull: false },
    description: Sequelize.STRING,
    looking_for: Sequelize.STRING,
    slogan: Sequelize.STRING,
    contacts: Sequelize.STRING,
})

module.exports = Project
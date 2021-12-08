const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Contact = sequelize.define('contact', {
    contact_name: { type: Sequelize.STRING,  allowNull: false },
    url: { type: Sequelize.STRING,  allowNull: false },
})

module.exports = Contact
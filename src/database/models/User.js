const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const User = sequelize.define('user', {
    name: { type: Sequelize.STRING,  allowNull: false },
    email: { type: Sequelize.STRING,  allowNull: false },
    password: { type: Sequelize.STRING,  allowNull: false },
    avatar: Sequelize.STRING,
})

module.exports = User
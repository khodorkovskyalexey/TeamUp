const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
})

module.exports = User
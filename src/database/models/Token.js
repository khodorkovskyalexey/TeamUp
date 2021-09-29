const { token } = require('morgan')
const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Token = sequelize.define('token', {
    refreshToken: { type: Sequelize.STRING,  allowNull: false },
})

module.exports = Token
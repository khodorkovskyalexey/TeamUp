const { Sequelize } = require('sequelize')

const { DATABASE_NAME, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } = require('../configs/env')

const sequelize_conf = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: "mysql",
})

module.exports = sequelize_conf
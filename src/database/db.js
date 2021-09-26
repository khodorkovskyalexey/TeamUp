const sequelize = require('./sequelize_conf')

const User = require('./models/User')
const Resume = require('./models/Resume')
const Project = require('./models/Project')
const Teammate = require('./models/Teammate')

User.hasMany(Resume, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Resume.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
User.belongsToMany(Project, { through: Teammate, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Project.belongsToMany(User, { through: Teammate, onUpdate: 'CASCADE', onDelete: 'CASCADE' })

sequelize
    .sync()
    // ОБНУЛЯЕТ ДАННЫЕ!
    // .sync({ force: true })
    .then(() => {
        console.log("Tables has been synced")
    })
    .catch(err => {
        throw err
    })

module.exports = {
    User,
    Resume,
    Project,
    Teammate,
}
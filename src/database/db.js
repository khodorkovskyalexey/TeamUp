const sequelize = require('./sequelize_conf')

const User = require('./models/User')
const Resume = require('./models/Resume')
const Project = require('./models/Project')
const Member = require('./models/Member')
const Token = require('./models/Token')
const Contact = require('./models/Contact')

User.hasOne(Resume, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Resume.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

User.hasMany(Contact, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Contact.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

User.hasMany(Token, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Token.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

User.hasMany(Member, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Member.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

Project.hasMany(Member, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Member.belongsTo(Project, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

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
    Member,
    Token,
    Contact,
}
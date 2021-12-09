const sequelize = require('./sequelize_conf')

const User = require('./models/User')
const Resume = require('./models/Resume')
const Project = require('./models/Project')
const Member = require('./models/Member')
const Token = require('./models/Token')
const Contact = require('./models/Contact')
const Candidate = require('./models/Candidate')

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

User.hasMany(Candidate, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Candidate.belongsTo(User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

Project.hasMany(Candidate, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
Candidate.belongsTo(Project, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })

sequelize
    .sync()
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
    Candidate,
}
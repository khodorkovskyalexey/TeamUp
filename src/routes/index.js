const router = require('koa-router')()

const { User, Resume, Contact, Token, Project, Member } = require('../database/db')
const auth_router = require('./auth_router')
const profile_router = require('./profile_router')
const project_router = require('./project_router')

router
    .use('/auth', auth_router.routes(), auth_router.allowedMethods())
    .use('/profile', profile_router.routes(), profile_router.allowedMethods())
    .use('/project', project_router.routes(), project_router.allowedMethods())

    // dev routes
    .get('/users', async ctx => {
        ctx.body = await User.findAll({ include: [Token, Contact, Resume, Member] })
    })
    .get('/projects', async ctx => {
        ctx.body = await Project.findAll({ 
            include: {
                model: Member,
                attributes: ['role', 'isOwner'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            } 
        })
    })
    .get('/members', async ctx => {
        ctx.body = await Member.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Project,
                    attributes: ['title', 'slogan']
                }
            ]
        })
    })

module.exports = router
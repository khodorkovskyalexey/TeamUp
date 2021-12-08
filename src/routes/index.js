const router = require('koa-router')()

const { User, Resume, Contact, Token, Project, Member } = require('../database/db')
const auth_router = require('./auth_router')
const profile_router = require('./profile_router')
const project_router = require('./project_router')
const user_router = require('./users_router');

router
    .use('/auth', auth_router.routes(), auth_router.allowedMethods())
    .use('/profile', profile_router.routes(), profile_router.allowedMethods())
    .use('/project', project_router.routes(), project_router.allowedMethods())
    .use('/users', user_router.routes(), user_router.allowedMethods())

module.exports = router
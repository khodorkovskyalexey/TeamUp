const AuthError = require('../exceptions/auth_error')
const { User } = require('../database/db')

module.exports = async (ctx, next) => {
    const { email } = ctx.request.body
    await User.findOne({ where: { email } })
        .then(candidate => {
            if(candidate) {
                throw AuthError.BadRequest(`Пользователь с почтой ${email} уже существует`)
            }
        })

    await next()
}
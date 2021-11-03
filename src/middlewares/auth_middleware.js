const auth_error = require('../exceptions/auth_error')
const token_service = require('../services/token_service')

module.exports = async function (ctx, next) {
    const authorization_header = ctx.get("Authorization")
    if (!authorization_header) {
        throw auth_error.UnauthorizedError()
    }

    const access_token = authorization_header.split(' ')[1]
    if (!access_token) {
        throw auth_error.UnauthorizedError()
    }

    const userData = token_service.validateAccessToken(access_token)
    if (!userData) {
        throw auth_error.UnauthorizedError()
    }

    ctx.request.user = userData
    await next()
}
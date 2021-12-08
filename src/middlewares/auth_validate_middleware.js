const { validationResults } = require('koa-req-validation')
const auth_error = require('../exceptions/auth_error')

module.exports = async function (ctx, next) {
    if(validationResults(ctx).hasErrors()) {
        const errors = validationResults(ctx).array().map(element => {
            return {
                message: element.msg,
                param: element.param
            }
        })
        throw auth_error.BadRequest('Отправленные данные имеют неверный формат', errors)
    }

    await next()
}
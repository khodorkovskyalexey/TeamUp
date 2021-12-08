const auth_middleware = require('./auth_middleware')

module.exports = async function (ctx, next) {
    try {
        await auth_middleware(ctx, next);
    } catch (error) {
        await next();
    }
}
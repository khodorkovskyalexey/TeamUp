// https://habr.com/ru/post/307148/ взял отсюда
module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)

        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            message: err.message,
            errors: err.errors || [],
        }
    }
}
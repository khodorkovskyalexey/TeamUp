const multer = require('multer')

// https://habr.com/ru/post/307148/ взял отсюда
module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof multer.MulterError) {
            err.status = 404
            err.message = "Multer Error"
        }
        console.log(err)
        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            message: err.message,
            errors: err.errors || [],
        }
    }
}
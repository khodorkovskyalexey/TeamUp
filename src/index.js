const Koa = require('koa')

const { PORT, CLIENT_URL } = require('./configs/env')

// Middleware
const cors = require('koa-cors')
const bodyParser = require('koa-body')()
const logger = require('koa-morgan')
const errorMiddleware = require('./middlewares/error_middleware');

const server = new Koa();

// routes
const router = require('./routes/index')

const port = PORT || 8081;
server
    // cors
    .use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', CLIENT_URL)
        ctx.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        )
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        ctx.set('Access-Control-Allow-Credentials', true)
        await next();
    })

    .use(errorMiddleware)

    // parsers
    .use(bodyParser)

    // routes
    .use(router.routes())
    .use(router.allowedMethods())

    // logger
    .use(logger('dev'))

    .use(cors({ credentials: true, origin: CLIENT_URL }))

    .listen(port, () => {
        console.log(`Server listening on port: ${port}`)
    })
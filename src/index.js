const Koa = require('koa')

const { PORT } = require('./configs/env')

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
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept', // , Access-Control-Allow-Credentials, Credentials
        )
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        ctx.set('Access-Control-Allow-Credentials', 'true')
        await next();
    })

    .use(errorMiddleware)

    // .use(cors({ credentials: true }))

    // parsers
    .use(bodyParser)

    // routes
    .use(router.routes())

    // logger
    .use(logger('dev'))

    .use(cors({ credentials: true }))

    .listen(port, () => {
        console.log(`Server listening on port: ${port}`)
    })
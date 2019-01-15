const Koa = require('koa')
const app = new Koa()
const router = require('./src/routes')
const koaLogger = require('koa-logger')

// 配置控制台日志中间件
app.use(koaLogger())

app.use(router.routes())

// app.use(async (ctx) => {
//     ctx.body = 'hello koa2'
// })

//temp

app.listen(3000)

console.log('[demo] start-quick is starting at port 3000')
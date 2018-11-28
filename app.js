const Koa = require('koa')
const app = new Koa()
const router = require('./src/routes')

app.use(router.routes())

// app.use(async (ctx) => {
//     ctx.body = 'hello koa2'
// })

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

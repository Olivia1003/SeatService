const Koa = require('koa')
const app = new Koa()
const router = require('./src/routes')
const koaLogger = require('koa-logger')

const rushProcess = require('./src/controllers/rushProcess')

// 配置控制台日志中间件
// app.use(koaLogger())

app.use(router.routes())

app.listen(3000)

console.log('start-quick is starting at port 3000')

// 启动队列监听
rushProcess.initRushProcess()

// socket.io

// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);

// server.listen(3001, () => {
//     console.log('socket.io listening at 3001')
// })

// io.on('connection', function (socket) {
//     console.log('socket connect...')
//     // 接收并处理客户端的事件
//     socket.on('rushSeatReq', function (data) {
//         console.log('io rushSeat on', data);
//         // 触发客户端事件rushSeatRes
//         socket.emit('rushSeatRes', 'hello from server!')
//     })
//     断开事件
//     socket.on('disconnect', function (data) {
//         console.log('rushSeatReq 断开', data)
//     })
// })





// WebSocket

// const WebSocket = require('ws')

// console.log('init WebSocket')
// const wss = new WebSocket.Server({
//     port: 3001
// });

// wss.on('connection', function connection(ws) {
//     console.log('WebSocket connection', message)
//     ws.on('message', function incoming(message) {
//         console.log('WebSocket message', message)
//     });
// });
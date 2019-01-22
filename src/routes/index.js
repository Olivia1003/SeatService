const Router = require('koa-router')
const user = require('./user')
const seat = require('./seat')
const order = require('./order')

let router = new Router()
router.use('/user', user.routes())
router.use('/seat', seat.routes())
router.use('/order', order.routes())

module.exports = router
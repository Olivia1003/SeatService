const Router = require('koa-router')

// const seatController = require('./../controllers/seat')
// const userController = require('../controllers/user')

const order = require('./order')

let router = new Router()

// 查
// router.get('/getSeatInfo', seatController.getSeatInfo)
// router.get('/getUserInfo', userController.getUserInfo)

router.use('/order', order.routes())

module.exports = router
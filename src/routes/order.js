const Router = require('koa-router')
const orderController = require('../controllers/order')

let router = new Router()

const routers = router
    .get('/search', orderController.getOrderByUserId)
    .delete('/', orderController.deleteOrderById)

module.exports = routers
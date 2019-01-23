const Router = require('koa-router')
const orderController = require('../controllers/order')

let router = new Router()

const routers = router
    .get('/', orderController.testFun)
    .get('/search', orderController.getOrderByUserId)
    .delete('/', orderController.deleteOrderById)
    .put('/update', orderController.changeOrderStatus)

module.exports = routers
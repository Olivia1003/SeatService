const orderService = require('./../services/orderService')

// 根据user_id得到对应的order list
async function getOrderByUserId(ctx) {
    const userId = ctx.request.query.userId || '0'
    let resData = await orderService.getOrderByUserId(userId)
    ctx.response.status = 200
    ctx.response.body = resData
}

// 根据order_id删除订单（status->0）
async function deleteOrderById(ctx) {
    console.log('deleteOrderById', ctx.request.query.orderId)
    const orderId = ctx.request.query.orderId
    let resData = await orderService.deleteOrderById(orderId)
    console.log('deleteOrderById res', resData)
    console.log('deleteOrderById res', resData.affectedRows)
    ctx.response.status = 200
    ctx.response.body = resData
}

module.exports = {
    getOrderByUserId,
    deleteOrderById
}
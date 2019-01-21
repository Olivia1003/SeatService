const orderService = require('./../services/orderService')
const dateUtil = require('../utils/dateUtil')
const timeSecUtil = require('../utils/timeSecUtil')

// 根据user_id得到对应的order list
async function getOrderByUserId(ctx) {
    const userId = ctx.request.query.userId || '0'
    console.log('getOrderByUserId requst', ctx.request.query)
    const queryRes = await orderService.getOrderByUserId(userId)
    console.log('getOrderByUserId result', queryRes)
    const resData = queryRes.map((oItem) => {
        return {
            seatId: oItem.seat_id,
            seatName: oItem.name,
            school: oItem.school,
            floor: oItem.floor,
            keywords: oItem.keywords,
            orderId: oItem.order_id,
            date: oItem.date,
            timeList: JSON.parse(oItem.time_list) || [],
            status: oItem.status
        }
    })
    ctx.response.status = 200
    ctx.response.body = resData
}

// 根据order_id删除订单（status->0）
async function deleteOrderById(ctx) {
    console.log('deleteOrderById request', ctx.request.query)
    const orderId = ctx.request.query.orderId
    let queryRes = await orderService.deleteOrderById(orderId)
    console.log('deleteOrderById result', queryRes)
    // 判断是否删除成功
    const resData = {
        flag: (queryRes.affectedRows >= 1 && queryRes.changedRows >= 1) ? 1 : 0
    }
    ctx.response.status = 200
    ctx.response.body = resData
}

// 根据order_id改变订单status
async function changeOrderStatus(ctx) {
    console.log('changeOrderStatus request', ctx.request.query)
    const orderId = ctx.request.query.orderId
    const status = ctx.request.query.status
    let queryRes = await orderService.changeOrderStatus(orderId, status)
    console.log('changeOrderStatus result', queryRes)
    // 判断是否成功
    const resData = {
        flag: (queryRes.affectedRows >= 1 && queryRes.changedRows >= 1) ? 1 : 0
    }
    ctx.response.status = 200
    ctx.response.body = resData
}

async function testFun() {
    console.log('testFun')
    // const res = timeSecUtil.isInTimeSection(new Date(2019, 1, 12, 8, 30), '2019-02-12', [0, 1, 2])
    const res = timeSecUtil.getTimeStrFromNumber([0, 1, 2])
    console.log('testFun res', res)
}

module.exports = {
    getOrderByUserId,
    deleteOrderById,
    changeOrderStatus,
    testFun
}
const orderService = require('./../services/orderService')
const dateUtil = require('../utils/dateUtil')
const timeSecUtil = require('../utils/timeSecUtil')
const redisUtil = require('../utils/redisUtil')

// 根据user_id得到对应的order list
async function getOrderByUserId(ctx) {
    const userId = ctx.request.query.userId || '0'
    console.log('getOrderByUserId requst', ctx.request.query)
    const queryRes = await orderService.getOrderByUserId(userId)
    console.log('getOrderByUserId result', queryRes)
    let resData = {}
    if (queryRes) {
        resData = queryRes.map((oItem) => {
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
    }
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
    const {
        orderId,
        status,
        leaveType
    } = ctx.request.query
    // TODO：如果状态1->2，要判断是否在预定时间内
    // TODO：如果状态2->3，判断暂离种类
    if (parseInt(status) === 3) {
        console.log('changeOrderStatus leave', leaveType)
        // 在表中记录该订单剩余暂离时间
    }
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
    // redisUtil.test()
    redisUtil.setHashValue('seat111', {
        date: '2019-02-10',
        timeList: '[1,2,3,7,8,9]'
    })
    const res = await redisUtil.getHashValue('seat111')
    // console.log('setHashValue res', res)

}

module.exports = {
    getOrderByUserId,
    deleteOrderById,
    changeOrderStatus,
    testFun
}
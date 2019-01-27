const dbUtils = require('./../utils/dbUtil')

async function getOrderByUserId(userId) {
    let _sql = `SELECT * 
                FROM order_info inner join seat_info
                ON order_info.seat_id = seat_info.seat_id
                WHERE user_id="${userId}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        result = result
    } else {
        result = null
    }
    return result
}

async function deleteOrderById(orderId) {
    let _sql = `UPDATE order_info 
                SET status = "0" 
                WHERE order_id="${orderId}"`
    let result = await dbUtils.query(_sql)
    return result
}

async function changeOrderStatus(orderId, status) {
    let _sql = `UPDATE order_info 
                SET status = "${status}" 
                WHERE order_id="${orderId}"`
    let result = await dbUtils.query(_sql)
    return result
}

async function addOrder(userId, seatId, date, timeList, status = 1) {
    // console.log('addOrder', userId, seatId, date, timeList, status)
    const timeListStr = JSON.stringify(timeList) || ''
    let _sql = `INSERT INTO order_info
                set user_id="${userId}",seat_id=${seatId},date="${date}",time_list="${timeListStr}",status="${status}"`
    let queryRes = await dbUtils.query(_sql)
    const resData = {
        flag: queryRes.affectedRows > 0
    }
    // console.log('addOrder result', resData)
    return resData
}

module.exports = {
    getOrderByUserId,
    deleteOrderById,
    changeOrderStatus,
    addOrder
}
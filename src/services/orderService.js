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
    // console.log('getSeatInfoById', result)
    return result
}

async function deleteOrderById(orderId) {
    let _sql = `UPDATE order_info 
                SET status = "0" 
                WHERE order_id="${orderId}"`
    console.log('deleteOrderById start')
    let result = await dbUtils.query(_sql)
    return result
}

module.exports = {
    getOrderByUserId,
    deleteOrderById
}
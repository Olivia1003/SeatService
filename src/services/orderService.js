const dbUtils = require('./../utils/dbUtil')

async function getOrderByUserId(userId) {
    let res
    let _sql = `SELECT * 
                FROM order_info inner join seat_info
                ON order_info.seat_id = seat_info.seat_id
                WHERE user_id="${userId}"`
    try {
        let queryRes = await dbUtils.query(_sql)
        if (Array.isArray(queryRes) && queryRes.length > 0) {
            res = queryRes
        }
    } catch (e) {
        console.log('getOrderByUserId fail', e)
    }
    return res
}

async function deleteOrderById(orderId) {
    let res
    let _sql = `UPDATE order_info 
                SET status = "0" 
                WHERE order_id="${orderId}"`
    try {
        res = await dbUtils.query(_sql)
    } catch (e) {
        console.log('deleteOrderById fail', e)
    }
    return res
}

async function changeOrderStatus(orderId, status) {
    let res
    let _sql = `UPDATE order_info 
                SET status = "${status}" 
                WHERE order_id="${orderId}"`
    try {
        res = await dbUtils.query(_sql)
    } catch (e) {
        console.log('changeOrderStatus fail', e)
    }
    return res
}

async function addOrder(userId, seatId, date, timeList, status = 1) {
    let resData = {
        flag: 0
    }
    const timeListStr = JSON.stringify(timeList) || ''
    let _sql = `INSERT INTO order_info
                set user_id="${userId}",seat_id=${seatId},date="${date}",time_list="${timeListStr}",status="${status}"`
    try {
        let queryRes = await dbUtils.query(_sql)
        resData.flag = queryRes.affectedRows > 0
    } catch (e) {
        console.log('addOrder fail', e)
    }
    return resData
}

module.exports = {
    getOrderByUserId,
    deleteOrderById,
    changeOrderStatus,
    addOrder
}
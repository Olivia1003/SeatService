const dbUtils = require('./../utils/dbUtil')

async function getSeatInfoById(seatId) {
    let _sql = `SELECT * from seat_info
                where id="${seatId}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = null
    }
    return result
}

module.exports = {
    getSeatInfoById
}

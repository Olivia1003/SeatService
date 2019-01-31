const dbUtils = require('./../utils/dbUtil')
const redisUtils = require('./../utils/redisUtil')
const rushProcess = require('../controllers/rushProcess')
// 抢座优先级：低，中，高
const RUSH_LIST = ['lowPrio', 'midPrio', 'highPrio']

// 根据seatId找到其所在floorId
async function getFloorBySeatId(seatId) {
    let floorId
    let _sql = `SELECT * from seat_info
                where seat_id="${seatId}"`
    try {
        let queryRes = await dbUtils.query(_sql)
        if (Array.isArray(queryRes) && queryRes.length > 0) {
            floorId = queryRes[0].floor_id
        }
    } catch (e) {
        console.log('getFloorBySeatId fail', e)
    }
    return floorId
}

module.exports = {
    getFloorBySeatId
}
const dbUtils = require('./../utils/dbUtil')
const redisUtils = require('./../utils/redisUtil')

async function getSeatInfoById(seatId) {
    let _sql = `SELECT * from seat_info
                where id="${seatId}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = null
    }
    // console.log('getSeatInfoById', result)
    return result
}

async function getFloorBySchool(schoolId) {
    let _sql = `SELECT * from floor_info
                where school_id="${schoolId}"`
    let result = await dbUtils.query(_sql)
    return result
}

// 根据floorId等搜索座位，从Redis中
async function searchSeatList(floorId, date, timeList, keywords) {
    let resData = {}
    const floorField = 'floor1'
    resData = await redisUtils.getHashField(floorField)

    // console.log('setHashField start', floorField)
    // redisUtils.setHashField(floorField, {
    //     'seat111': '{seatId:"111"}',
    //     'seat222': '{seatId:"222"}'
    // }).then((res) => {
    //     console.log('setHashField success')
    // }, (res) => {
    //     console.log('setHashField fail')
    // })
    return resData
}


module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList
}
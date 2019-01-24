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
    const queryRes = await redisUtils.getHashField(floorField)
    const allSeatList = []
    for (key in queryRes) {
        if (queryRes[key] && JSON.parse(queryRes[key])) {
            allSeatList.push(JSON.parse(queryRes[key]))
        }
    }
    console.log('allSeatList', allSeatList)
    // 筛选符合条件的，做标记（要返回所有座位信息）
    resData = allSeatList.map((sItem) => {
        let isFree = false
        if (sItem.seatType === 1) { // 仅标记椅子
            // 相同日期
            const sameDate = sItem.date === date
            // 重合时间段
            const sameTimeSec = sItem.timeList.some((secId) => {
                return timeList.indexOf(secId) >= 0
            })
            // 重合关键词，至少包含一个关键词
            const sameKeyword = sItem.keywords.some((kItem) => {
                return keywords.indexOf(kItem) >= 0
            })
            isFree = sameDate && sameTimeSec && sameKeyword
        }
        return {
            ...sItem,
            isFree
        }
    })
    console.log('filtered resData', resData)
    return resData
}


module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList
}
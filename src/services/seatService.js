const dbUtils = require('./../utils/dbUtil')
const redisUtils = require('./../utils/redisUtil')
const rushProcess = require('../controllers/rushProcess')
// 抢座优先级：低，中，高
const RUSH_LIST = ['lowPrio', 'midPrio', 'highPrio']
const PENDING_RUSH = 'pendingRushList'

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
    // const floorField = 'floor1'
    const floorField = `floor${floorId}`
    const queryRes = await redisUtils.getHashField(floorField)
    console.log('searchSeatList queryRes', queryRes)
    const allSeatList = []
    for (key in queryRes) {
        if (queryRes[key] && JSON.parse(queryRes[key])) {
            console.log('push item', queryRes[key], JSON.parse(queryRes[key]))
            allSeatList.push(JSON.parse(queryRes[key]))
        }
    }
    console.log('allSeatList', allSeatList)
    // 筛选符合条件的，做标记（要返回所有座位信息）
    resData = allSeatList.map((sItem) => {
        let isFree = false
        let resDate = ''
        let resTimeList = []
        if (sItem.seatType === 1) { // 仅标记椅子
            let sameDateTime = false
            // 遍历日期，看是否重合
            sItem.freeTime.forEach((tItem) => {
                if (sameDateTime) {
                    return
                }
                // 相同日期
                const sameDate = tItem.date === date
                // 重合时间段
                const sameTimeSec = tItem.timeList.some((secId) => {
                    return timeList.indexOf(secId) >= 0
                })
                if (sameDate && sameTimeSec) {
                    sameDateTime = true
                    resDate = tItem.date
                    resTimeList = tItem.timeList
                }
            })
            // 重合关键词，至少包含一个关键词
            const sameKeyword = sItem.keywords.some((kItem) => {
                return keywords.indexOf(kItem) >= 0
            })
            isFree = sameDateTime && sameKeyword
        }
        return {
            ...sItem,
            date: resDate,
            timeList: resTimeList,
            isFree
        }
    })
    console.log('filtered resData', resData)
    return resData
}

// 抢座
async function bookSeatRush(userId, userPoint, seatId, date, timeList) {
    let resData = {}
    const listKey = getPriorityByPoint(userPoint)
    const rushItem = {
        userId,
        seatId,
        date,
        timeList
    }
    if (listKey) {
        console.log('pushIntoList', listKey, rushItem)
        // 加入消息队列
        redisUtils.pushIntoList(listKey, JSON.stringify(rushItem))
            .then(() => {
                // 唤醒消息队列处理
                rushProcess.resetIsListening()
            })
        // 根据timeStamp记录请求
        const userKey = `user${userId}`
        const timeStamp = new Date().getTime()
        const rushDetailStr = await redisUtils.getHashFieldItem(PENDING_RUSH, userKey)
        const newRushItem = {
            timeStamp,
            status: 1
        }
        let rushDetail = []
        console.log('newRushItem', newRushItem)
        if (rushDetailStr && JSON.parse(rushDetailStr)) { // 之前有其他请求
            rushDetail = JSON.parse(rushDetailStr)
            console.log('get pending rush', PENDING_RUSH, userKey, rushDetail)
            rushDetail.push(newRushItem)
        } else { // 第一次请求
            console.log('get pending rush empty')
            rushDetail = [newRushItem]
        }
        console.log('set pending rush item', userKey, JSON.stringify(rushDetail))
        redisUtils.setHashFieldItem(PENDING_RUSH, userKey, JSON.stringify(rushDetail))
    } else {
        console.log('user forbiddened')
    }
    return resData
}

// 根据seatId找到其所在floorId
async function getFloorBySeatId(seatId) {
    let _sql = `SELECT * from seat_info
                where seat_id="${seatId}"`
    let queryRes = await dbUtils.query(_sql)
    // console.log('getFloorBySeatId queryRes', queryRes)
    const floorId = queryRes.floor_id
    return floorId
}


function getPriorityByPoint(point) {
    let res = ''
    if (point >= 0 && point < 100) {
        res = RUSH_LIST[0]
    } else if (point >= 100 && point < 200) {
        res = RUSH_LIST[1]
    } else if (point >= 200) {
        res = RUSH_LIST[2]
    }
    return res
}

module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList,
    bookSeatRush,
    getFloorBySeatId
}
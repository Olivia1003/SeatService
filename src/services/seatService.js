const dbUtils = require('./../utils/dbUtil')
const redisUtils = require('./../utils/redisUtil')
const rushProcess = require('../controllers/rushProcess')
const pendRushSearvice = require('../services/pendingRushService')
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
    try {
        const queryRes = await redisUtils.getHashField(floorField)
        console.log('searchSeatList queryRes success')
        console.log(queryRes)
        const allSeatList = []
        for (key in queryRes) {
            if (queryRes[key] && JSON.parse(queryRes[key])) {
                allSeatList.push(JSON.parse(queryRes[key]))
            }
        }
        // console.log('allSeatList', allSeatList)
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
        // console.log('filtered resData', resData)
    } catch (e) {
        console.log('searchSeatList queryRes fail')
    }
    return resData
}

// 抢座
async function bookSeatRush(userId, userPoint, seatId, date, timeList) {
    let resData = {}
    const listKey = getPriorityByPoint(userPoint)
    const timeStamp = new Date().getTime() // 生成该用户唯一的timeStamp
    const rushItem = {
        userId,
        seatId,
        date,
        timeList,
        timeStamp
    }
    if (listKey) { // 正常用户
        console.log('添加请求到队列', listKey, rushItem)
        // 加入消息队列
        redisUtils.pushIntoList(listKey, JSON.stringify(rushItem))
            .then(() => {
                // 唤醒消息队列处理
                rushProcess.resetIsListening()
            })
        // 根据timeStamp记录请求
        const addRes = await pendRushSearvice.addPendingRush(userId, timeStamp, 1)
        resData.timeStamp = timeStamp
        resData.flag = 1
    } else { // 黑名单
        console.log('user forbiddened')
        resData.flag = 0
    }
    return resData
}

// 提交抢座后查询抢座状态
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
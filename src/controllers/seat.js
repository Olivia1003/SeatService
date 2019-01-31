const seatService = require('./../services/seatService')
const pendRushService = require('./../services/pendingRushService')

async function getSeatInfoById(ctx) {
    let resData = await seatService.getSeatInfoById('3')
    ctx.body = resData
}

async function getFloorBySchool(ctx) {
    const schoolId = ctx.request.query.schoolId
    let queryRes = await seatService.getFloorBySchool(schoolId)
    const resData = queryRes.map((fItem) => {
        return {
            floorId: fItem.floor_id,
            floorName: fItem.floor_name
        }
    })
    console.log('getFloorBySchool res', resData)
    ctx.body = resData
}

// 根据floorId等搜索座位，从Redis中
async function searchSeatList(ctx) {
    let resData = {}
    console.log('查询座位 start', ctx.request.query)
    const floorId = ctx.request.query.floorId
    const date = ctx.request.query.date
    const timeList = JSON.parse(ctx.request.query.timeList) || []
    const keywords = JSON.parse(ctx.request.query.keywords) || []
    resData = await seatService.searchSeatList(floorId, date, timeList, keywords)
    ctx.body = resData
}

// 抢座
async function bookSeatRush(ctx) {
    let resData = {}
    const {
        userId,
        userPoint,
        seatId,
        date
    } = ctx.request.query
    const timeList = JSON.parse(ctx.request.query.timeList) || []
    // console.log('bookSeatRush req', userId, userPoint, seatId, date, timeList)
    // console.log('seatService', seatService)
    resData = await seatService.bookSeatRush(userId, userPoint, seatId, date, timeList)
    console.log('bookSeatRush 服务返回', resData)
    ctx.body = resData
}

// 提交抢座后查询抢座状态
async function getRushStatus(ctx) {
    let resData = {}
    const {
        userId,
        timeStamp
    } = ctx.request.query
    try {
        const queryRes = await pendRushService.getRushStatus(userId, timeStamp)
        resData.rushStatus = queryRes
        console.log('getRushStatus resData', resData)
    } catch (e) {
        console.log('getRushStatus fail', e)
    }
    ctx.body = resData
}

module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList,
    bookSeatRush,
    getRushStatus
}
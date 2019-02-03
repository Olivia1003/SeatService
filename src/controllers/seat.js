const seatService = require('./../services/seatService')
const pendRushService = require('./../services/pendingRushService')

async function getSeatInfoById(ctx) {
    let resData
    try {
        resData = await seatService.getSeatInfoById('3')
    } catch (e) {
        console.log('getSeatInfoById fail', e)
    }
    ctx.body = resData
}

async function getFloorBySchool(ctx) {
    let resData
    const schoolId = ctx.request.query.schoolId
    try {
        let queryRes = await seatService.getFloorBySchool(schoolId)
        resData = queryRes.map((fItem) => {
            return {
                floorId: fItem.floor_id,
                floorName: fItem.floor_name
            }
        })
    } catch (e) {
        console.log('getFloorBySchool fail', e)
    }
    ctx.body = resData
}

// 根据floorId等搜索座位，从Redis中
async function searchSeatList(ctx) {
    let resData
    console.log('查询座位start', ctx.request.query)
    try {
        const floorId = ctx.request.query.floorId
        const date = ctx.request.query.date
        const timeList = JSON.parse(ctx.request.query.timeList) || []
        const keywords = JSON.parse(ctx.request.query.keywords) || []
        resData = await seatService.searchSeatList(floorId, date, timeList, keywords)
    } catch (e) {
        console.log('searchSeatList fail', e)
    }
    ctx.body = resData
}

// 抢座
async function bookSeatRush(ctx) {
    let resData
    const {
        userId,
        userPoint,
        seatId,
        date
    } = ctx.request.query
    try {
        const timeList = JSON.parse(ctx.request.query.timeList) || []
        resData = await seatService.bookSeatRush(userId, userPoint, seatId, date, timeList)
    } catch (e) {
        console.log('bookSeatRush fail', e)
    }
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
    console.log('return getRushStatus', resData)
    ctx.body = resData
}

// 管理端修改座位
async function changeSeatPosition(ctx) {
    let resData = {}
    // console.log('changeSeatPosition', ctx.request.query)
    const seatDataStr = ctx.request.query.seatData
    const floorId = ctx.request.query.floorId
    const changeRes = await seatService.changeSeatPosition(seatDataStr, floorId)
    console.log('changeSeatPosition changeRes', changeRes)
    resData.flag = changeRes.flag
    ctx.body = resData
}

module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList,
    bookSeatRush,
    getRushStatus,
    changeSeatPosition
}
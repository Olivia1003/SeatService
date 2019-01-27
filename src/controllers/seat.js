const seatService = require('./../services/seatService')

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
    console.log('searchSeatList start', ctx.request.query)
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
    console.log('bookSeatRush req', userId, userPoint, seatId, date, timeList)
    // console.log('seatService', seatService)
    const queryRes = seatService.bookSeatRush(userId, userPoint, seatId, date, timeList)
    console.log('bookSeatRush queryRes', queryRes)
    ctx.body = resData
}

module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList,
    bookSeatRush
}
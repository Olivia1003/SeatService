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
    const {
        floorId,
        date,
        timeList,
        keywords
    } = ctx.request.query
    console.log('searchSeatList start', ctx.request.query)
    let queryRes = await seatService.searchSeatList(floorId, date, timeList, keywords)
    console.log('searchSeatList res', queryRes)
    // const resData = queryRes.map((fItem) => {
    //     return {
    //         floorId: fItem.floor_id,
    //         floorName: fItem.floor_name
    //     }
    // })
    // console.log('getFloorBySchool res', resData)
    // ctx.body = resData
}

module.exports = {
    getSeatInfoById,
    getFloorBySchool,
    searchSeatList
}
const seatService = require('./../services/seatService')
const timeSecUtil = require('../utils/timeSecUtil')

async function getSeatInfo(ctx) {
    // let resData = await seatService.getSeatInfoById('3')
    // ctx.body = resData
    const temp = timeSecUtil.getTimeStrFromNumber()
}

module.exports = {
    getSeatInfo
}
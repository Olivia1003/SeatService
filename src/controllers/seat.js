const seatService = require('./../services/seatService')

async function getSeatInfoById(ctx) {
    let resData = await seatService.getSeatInfoById('3')
    ctx.body = resData
}

module.exports = {
    getSeatInfoById
}
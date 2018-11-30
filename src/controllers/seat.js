const seatService = require('./../services/seatService')

async function getSeatInfo(ctx) {
    // let resData = {
    //     name: 'jack'
    // }
    let resData = seatService.getSeatInfoById('1')
    console.log('resData', resData)
    ctx.body = resData
}

module.exports = {
    getSeatInfo
}

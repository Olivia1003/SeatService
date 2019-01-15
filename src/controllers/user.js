const userService = require('./../services/userService')

async function getUserInfo(ctx) {
    let resData = await userService.getUserByName('Olivia')
    ctx.body = resData
}

module.exports = {
    getUserInfo
}
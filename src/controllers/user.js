const userService = require('./../services/userService')
const http = require('http')
const global = require('../utils/global')

// 根据openId获取用户信息
async function getUserInfoById(ctx) {
    // const userId = ctx.request.query.userId
    const userId = 1003
    const queryRes = await userService.getUserInfoById(userId)
    const resData = {
        userId: queryRes.user_id,
        name: queryRes.name,
        school: queryRes.school,
        point: queryRes.point,
        rank: queryRes.rank,
        hour: queryRes.hour,
        leaveShort: queryRes.leave_short,
        leaveLong: queryRes.leave_long
    }
    ctx.body = resData
}

// 接收客户端code，向微信服务器请求openId等信息
async function checkUserLogin(ctx) {
    const code = ctx.request.query.code
    const appId = global.getGlobal('appId')
    const appSecret = global.getGlobal('appSecret')
    const reqUrl = `http://api.weixin.qq.com/sns/jscode2session
    ?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    console.log('reqUrl', reqUrl)
    // http.get(reqUrl, (res) => {
    //     console.log('checkUserLogin get weixin res', res)
    // })
    ctx.body = {}
}

module.exports = {
    getUserInfoById,
    checkUserLogin
}
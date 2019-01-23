const Axios = require('axios')
const userService = require('./../services/userService')
const global = require('../utils/global')

// 根据openId获取用户信息
async function getUserInfoById(ctx) {
    const userId = ctx.request.query.userId
    // const userId = 1003
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
    const transRes = await transCodeToSession(code)
    const userId = transRes.openid
    // 查找user_open_id，判断是否第一次登录
    const queryRes = await userService.getUserInfoById(userId)
    console.log('user queryRes', queryRes)
    if (!queryRes) { // 第一次登录，数据库中增加用户信息
        const insertRes = await userService.registerUser(userId)
        console.log('user insertRes', insertRes)
    }
    const resData = {
        userId: transRes.openid
    }
    // console.log('checkUserLogin res', resData)
    ctx.body = resData
}

async function transCodeToSession(code) {
    const appId = global.getGlobal('appId')
    const appSecret = global.getGlobal('appSecret')
    const reqUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    // console.log('reqUrl', reqUrl)
    return new Promise((resolve, reject) => {
        Axios.get(reqUrl)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

module.exports = {
    getUserInfoById,
    checkUserLogin
}
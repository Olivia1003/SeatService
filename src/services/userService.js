const dbUtils = require('./../utils/dbUtil')

async function getUserInfoById(userId) {
    let _sql = `SELECT * from user_info
                where user_id="${userId}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = undefined
    }
    return result
}

// async function getUserInfoByOpenId(userOpenId) {
//     let _sql = `SELECT * from user_info
//                 where user_open_id="${userOpenId}"`
//     let result = await dbUtils.query(_sql)
//     if (Array.isArray(result) && result.length > 0) {
//         result = result[0]
//     } else {
//         result = undefined
//     }
//     return result
// }

// insert添加用户信息
async function registerUser(userId) {
    let _sql = `INSERT INTO user_info
                set user_id="${userId}",school="华东师范大学"`
    let result = await dbUtils.query(_sql)
    return result
}

module.exports = {
    getUserInfoById,
    // getUserInfoByOpenId,
    registerUser
}
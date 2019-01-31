const dbUtils = require('./../utils/dbUtil')

async function getUserInfoById(userId) {
    let resData
    let _sql = `SELECT * from user_info
                where user_id="${userId}"`
    try {
        let queryRes = await dbUtils.query(_sql)
        if (Array.isArray(queryRes) && queryRes.length > 0) {
            resData = queryRes[0]
        }
    } catch (e) {
        console.log('getUserInfoById fail', e)
    }
    return resData
}

// insert添加用户信息
async function registerUser(userId, schoolId = 1) {
    let resData
    let _sql = `INSERT INTO user_info
                set user_id="${userId}",school_id=${schoolId}`
    try {
        resData = await dbUtils.query(_sql)
    } catch (e) {
        console.log('registerUser fail', e)
    }
    return resData
}

module.exports = {
    getUserInfoById,
    registerUser
}
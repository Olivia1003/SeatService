const dbUtils = require('./../utils/dbUtil')

async function getUserByName(userName) {
    let _sql = `SELECT * from user_info
                where name="${userName}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = undefined
    }
    return result
}

module.exports = {
    getUserByName
}
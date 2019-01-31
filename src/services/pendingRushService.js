const redisUtils = require('./../utils/redisUtil')

const PENDING_RUSH = 'pendingRushList'

// 根据timeStamp记录请求
async function addPendingRush(userId, timeStamp, status) {
    const userKey = `user${userId}`
    let rushDetailStr
    let rushDetail = []
    let searchSuccess = false // 该user是否有记录
    try {
        rushDetailStr = await redisUtils.getHashFieldItem(PENDING_RUSH, userKey)
        searchSuccess = true
    } catch (e) {
        searchSuccess = false
    }
    const newRushItem = {
        timeStamp,
        status
    }
    // console.log('newRushItem', newRushItem)
    if (searchSuccess) { // 之前有其他请求
        console.log('用户之前有请求，push rush item')
        rushDetail = JSON.parse(rushDetailStr)
        rushDetail.push(newRushItem)
    } else { // 第一次请求
        console.log('用户第一次请求，新增pending rush')
        rushDetail = [newRushItem]
    }
    // console.log('set pending rush item', userKey, rushDetail)
    const setRes = await redisUtils.setHashFieldItem(PENDING_RUSH, userKey, JSON.stringify(rushDetail))
}

// 更新某个rush状态
async function setPendingRush(userId, timeStamp, status) {
    // console.log('setPendingRush params', userId, timeStamp, status)
    const res = {
        flag: 0
    }
    const userKey = `user${userId}`
    let rushDetailStr
    let searchSuccess = false // 该user是否有记录
    try {
        rushDetailStr = await redisUtils.getHashFieldItem(PENDING_RUSH, userKey)
        searchSuccess = true
    } catch (e) {
        searchSuccess = false
    }
    if (searchSuccess) { // 找到pending rush记录，更新
        const rushDetail = JSON.parse(rushDetailStr)
        rushDetail.forEach((rItem) => {
            if (rItem.timeStamp === timeStamp) {
                rItem.status = status
                res.flag = 1
            }
        })
        console.log('setPendingRush，更新', rushDetail)
        const setRes = await redisUtils.setHashFieldItem(PENDING_RUSH, userKey, JSON.stringify(rushDetail))
    } else { // 没有找到pending rush记录，新增一条
        console.log('setPendingRush，新增', userId, timeStamp, status)
        const addRes = await addPendingRush(userId, timeStamp, status)
    }
    res.flag = searchSuccess ? 1 : 0
    return res
}

// 查询抢座状态
// pending 1
// success 2
// fail 3
async function getRushStatus(userId, timeStamp) {
    let res = 1
    // console.log('getRushStatus', userId, timeStamp)
    const userKey = `user${userId}`
    let searchSuccess = false
    let rushDetailStr
    let rushDetail
    try {
        rushDetailStr = await redisUtils.getHashFieldItem(PENDING_RUSH, userKey)
        searchSuccess = true
    } catch (e) {
        searchSuccess = false
    }
    if (searchSuccess) {
        rushDetail = JSON.parse(rushDetailStr)
        rushDetail.forEach((tItem) => {
            if (timeStamp === String(tItem.timeStamp)) {
                res = tItem.status
            }
        })
    }
    return res
}

module.exports = {
    addPendingRush,
    setPendingRush,
    getRushStatus
}
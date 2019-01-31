const redisUtil = require('../utils/redisUtil')
const orderService = require('../services/orderService')
// const seatService = require('../services/seatService')
const seatService = require('../services/tempService')
const pendRushService = require('../services/pendingRushService')
const arrayUtil = require('../utils/arrayUtil')
// const dbUtil = require('../utils/dbUtil')
// const TIME_OUT = 3000
// let itemCount = 1 // 执行的请求数，用于区别优先级
// let freeCount = 0 // 读到队列为空的次数
const MAX_FREE_COUNT = 10 // 最大空闲次数，达到后暂时休眠
let isListening = true // 是否在监听
// 抢座优先级：低，中，高
const RUSH_LIST = ['lowPrio', 'midPrio', 'highPrio']

// 请求进入队列后，保证此时在监听
function resetIsListening() {
    // freeCount = 0
    if (!isListening) {
        console.log('监听队列————重新启动')
        startRushProcess(1, 1)
    }
}

// 取出一个请求后，更新redis并且在数据库新增订单
async function generateRushOrder(rushItem) {
    console.log('取出并处理rushItem', rushItem)
    let resData = {
        flag: 0
    }
    try {
        // 更新redis中空闲时间
        console.log('generateRushOrder start', rushItem)
        const floorId = await seatService.getFloorBySeatId(rushItem.seatId)
        if (!floorId) {
            console.log('get floorId fail')
            return
        }
        console.log('floorId', floorId)
        const floorKey = `floor${floorId}`
        const seatKey = `seat${rushItem.seatId}`
        const seatDataStr = await redisUtil.getHashFieldItem(floorKey, seatKey)
        console.log('seatDataStr', seatDataStr)
        let isBookSuccess = false // 时间段是否能预约成功
        if (seatDataStr && JSON.parse(seatDataStr)) {
            const seatData = JSON.parse(seatDataStr)
            console.log('seatData', seatData, seatData.freeTime)
            const newFreeTime = seatData.freeTime.map((tItem) => {
                if (tItem.date === rushItem.date) {
                    // 时间段取差集，判断是否预约成功
                    const subTimeList = arrayUtil.getSub(tItem.timeList, rushItem.timeList)
                    const unionTimeList = arrayUtil.getUnion(tItem.timeList, rushItem.timeList)
                    if (unionTimeList.length === rushItem.timeList.length) {
                        isBookSuccess = true
                    }
                    return {
                        date: tItem.date,
                        timeList: subTimeList
                    }
                } else {
                    return tItem
                }
            })
            const newSeatData = {
                ...seatData,
                freeTime: newFreeTime
            }
            // console.log('newSeatData', newSeatData, newSeatData.freeTime)
            if (isBookSuccess) {
                const setRes = await redisUtil.setHashFieldItem(floorKey, seatKey, JSON.stringify(newSeatData))
            }
        }
        // 更新pending rush状态
        // 若可预约，在order_info新增一条
        if (isBookSuccess) {
            // 在order_info新增一条
            const addDBRes = await orderService.addOrder(rushItem.userId, rushItem.seatId, rushItem.date, rushItem.timeList)
            // 更新pending rush状态
            const setRushRes = await pendRushService.setPendingRush(rushItem.userId, rushItem.timeStamp, 2)
            resData.flag = 1
        } else {
            const setRushRes = await pendRushService.setPendingRush(rushItem.userId, rushItem.timeStamp, 3)
            resData.flag = 0
        }
    } catch (e) {
        console.log('generateRushOrder fail', e)
    }
    return resData
}


// 从消息队列中取出一个消息，进行处理
function getRushItem(listKey) {
    return new Promise((resolve, reject) => {
        // console.log('processRushReq', listKey)
        // const listKey = RUSH_LIST[1]
        redisUtil.popFromList(listKey)
            .then((res) => { // 有消息，处理
                // console.log('---getRushItem success res', listKey, res)
                if (res && JSON.parse(res)) {
                    const rushItem = JSON.parse(res)
                    // 在数据库添加订单，并且修改该座位空闲时间段
                    // console.log('开始添加订单', rushItem)
                    generateRushOrder(rushItem)
                        .then((res) => {
                            if (res.flag === 1) {
                                console.log('添加订单成功', res)
                                resolve()
                            } else {
                                console.log('添加订单失败', res)
                                reject()
                            }
                        })
                }
            }, (res) => { // 无消息
                // console.log('---getRushItem fail no message', listKey)
                reject()
            })
    })
}


function startRushProcess(itemCount, freeCount) {
    // 一定数量后重置
    if (itemCount >= 100) {
        itemCount = 1
    }
    let listKey = RUSH_LIST[0]
    if (itemCount % 7 === 0) { // 低
        listKey = RUSH_LIST[0]
    } else if (itemCount % 3 === 0) { // 中
        listKey = RUSH_LIST[1]
    } else { // 高
        listKey = RUSH_LIST[2]
    }
    // itemCount++
    // 指定队列，取出一个消息进行处理，处理完成后继续
    getRushItem(listKey)
        .then((res) => {
            console.log('处理请求成功', listKey, 'itemCount', itemCount)
            // freeCount = 0
            // console.log('处理成功再次调用......')
            startRushProcess(++itemCount, 0)
        }, (res) => {
            // freeCount++
            console.log('队列为空', listKey, 'freeCount', freeCount)
            // 连续多次请求队列为空，暂时休眠
            if (freeCount >= MAX_FREE_COUNT) {
                isListening = false
                console.log('监听队列————暂时休眠')
                return
            } else {
                // console.log('队列为空再次调用......')
                startRushProcess(++itemCount, ++freeCount)
            }
        })
}

function initRushProcess() {
    console.log('初始启动监听队列...')
    // console.log('seatService', seatService)
    // console.log('orderService', orderService)
    startRushProcess(1, 1)
}

module.exports = {
    initRushProcess,
    resetIsListening
}
const redisUtil = require('../utils/redisUtil')
// const TIME_OUT = 3000
let PRO_COUNT = 0
// 抢座优先级：低，中，高
const RUSH_LIST = ['lowPrio', 'midPrio', 'highPrio']

// 从消息队列中取出一个消息，进行处理
function getRushItem(listKey) {
    return new Promise((resolve, reject) => {
        // console.log('processRushReq', listKey)
        // const listKey = RUSH_LIST[1]
        redisUtil.bPopFromList(listKey)
            .then((res) => { // 有消息，处理
                console.log('---getRushItem success res', listKey, typeof res)
                if (res[1] && JSON.parse(res[1])) {
                    const rushItem = JSON.parse(res[1])
                    console.log('---getRushItem success rushItem', rushItem)
                    // 在数据库添加订单，并且修改该座位空闲时间段
                    resolve()
                }
            }, (res) => { // 无消息
                console.log('---getRushItem fail no message', listKey)
                reject()
            })
    })
}


function startRushProcess() {
    // 一定数量后重置
    if (PRO_COUNT >= 100) {
        PRO_COUNT = 0
    }
    let listKey = RUSH_LIST[0]
    if (PRO_COUNT % 10 === 0) { // 低
        listKey = RUSH_LIST[0]
    } else if (PRO_COUNT % 3 === 0) { // 中
        listKey = RUSH_LIST[1]
    } else { // 高
        listKey = RUSH_LIST[2]
    }
    PRO_COUNT++
    // 指定队列，取出一个消息进行处理，处理完成后继续
    getRushItem(listKey).then((res) => {
        startRushProcess()
    }, (res) => {
        startRushProcess()
    })
}

function initRushProcess() {
    startRushProcess()
}

module.exports = {
    initRushProcess
}
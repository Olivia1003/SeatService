const redisUtils = require('./../src/utils/redisUtil')
// 初始化座位
function initRedisSeat() {
    console.log('initRedisSeat')
    // const floorField = 'floor1'
    const floorField = 'floor1'
    const originSeatList = {
        seat111: {
            seatId: 111,
            position: [1, 1],
            seatType: 1,
            freeTime: [{
                date: '2019-02-10',
                timeList: [1, 2, 3, 4, 5],
            }, {
                date: '2019-02-11',
                timeList: [1, 2, 3, 4, 5],
            }],
            keywords: ['window']
        },
        seat222: {
            seatId: 222,
            position: [1, 2],
            seatType: 1,
            freeTime: [{
                date: '2019-02-10',
                timeList: [6, 7, 8],
            }, {
                date: '2019-02-11',
                timeList: [6, 7, 8],
            }],
            keywords: ['window']
        },
        seat333: {
            seatId: 333,
            position: [1, 3],
            seatType: 1,
            freeTime: [{
                date: '2019-02-10',
                timeList: [1, 9, 10, 11, 12],
            }, {
                date: '2019-02-11',
                timeList: [1, 9, 10, 11, 12],
            }],
            keywords: []
        },
        seat444: {
            seatId: 444,
            position: [2, 3],
            seatType: 2,
            freeTime: [],
            keywords: []
        }
    }
    const seatList = {}
    for (key in originSeatList) {
        seatList[key] = JSON.stringify(originSeatList[key])
    }
    console.log('seatList', seatList)
    redisUtils.setHashField(floorField, seatList)
        .then((res) => {
            console.log('initRedisSeat success')
        }, (res) => {
            console.log('initRedisSeat fail')
        })
}

function initPendingRush() {
    const field = 'pendingRushList'
    const originRushList = {
        useroxNlG45Cgon1PJh2gjw8vyybaEAU: [{
            timeStamp: 152343,
            status: 1
        }],
        userox2: [{
            timeStamp: 152343,
            status: 1
        }],
        userox3: [{
            timeStamp: 152343,
            status: 1
        }]
    }
    const rushList = {}
    for (key in originRushList) {
        rushList[key] = JSON.stringify(originRushList[key])
    }
    console.log('rushList', rushList)
    redisUtils.setHashField(field, rushList)
        .then((res) => {
            console.log('initPendingRush success')
        }, (res) => {
            console.log('initPendingRush fail')
        })
}
// 初始化pending rush
initRedisSeat()
initPendingRush()
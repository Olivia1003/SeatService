const redisUtils = require('./../src/utils/redisUtil')

function initRedisSeat() {
    console.log('initRedisSeat')
    const floorField = 'floor1'
    const originSeatList = {
        seat111: {
            seatId: 111,
            position: [1, 1],
            seatType: 1,
            date: '2019-02-10',
            timeList: [1, 2, 3, 4, 5], // free time
            keywords: ['window']
        },
        seat222: {
            seatId: 222,
            position: [1, 2],
            seatType: 1,
            date: '2019-02-10',
            timeList: [6, 7, 8], // free time
            keywords: ['window']
        },
        seat333: {
            seatId: 333,
            position: [1, 3],
            seatType: 1,
            date: '2019-02-10',
            timeList: [1, 9, 10, 11, 12], // free time
            keywords: []
        },
        seat444: {
            seatId: 444,
            position: [2, 3],
            seatType: 2,
            date: '',
            timeList: [], // free time
            keywords: []
        }
    }
    const seatList = {}
    for (key in originSeatList) {
        seatList[key] = JSON.stringify(originSeatList[key])
    }
    console.log('seatList', seatList)
    redisUtils.setHashField(floorField, seatList).then((res) => {
        console.log('setHashField success')
    }, (res) => {
        console.log('setHashField fail')
    })
}

initRedisSeat()
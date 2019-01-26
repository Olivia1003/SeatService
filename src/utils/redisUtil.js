const Redis = require('redis')

const client = Redis.createClient(6379, '127.0.0.1')
client.on('error', function (err) {
    console.log('redis error', err)
})

function test() {
    console.log('redis test')
    client.set('color', 'red', Redis.print);
    client.get('color', function (err, value) {
        if (err) throw err;
        console.log('redis get ' + value)
        // client.quit();
    })
}

/**
 * 根据floorId得到所有seat信息列表
 * @param {string} field 1
 * @return {Promise} 数据为seatList
 */
function getHashField(field) {
    return new Promise((resolve, reject) => {
        client.hgetall(field, function (err, value) {
            if (err) {
                reject()
            } else {
                resolve(value)
            }
        })
    })
}

/**
 * 根据field和seatId[]得到多个
 * @param {string} field floorId
 * @param {Array} key seatId
 * @return 该seat信息
 */
function getHashFieldItem(field, key) {
    return new Promise((resolve, reject) => {
        client.hmget(field, key, function (err, value) {
            if (err) {
                reject()
            } else {
                resolve(value)
            }
        })
    })
}

/**
 * 设置整个field(floor)的值
 * @param {*} field 'floor1'
 * @param {*} fieldValue {seat111:'',seat222:''}
 */
function setHashField(field, fieldValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, fieldValue, Redis.print)
        resolve()
    })
}

/**
 * 设置单个seat的值
 * @param {*} field 'floor1'
 * @param {*} key 'seat111'
 * @param {*} keyValue '{date:"2019-02-16",type:1}'
 */
function setHashFieldItem(field, key, keyValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, key, keyValue, Redis.print)
        resolve()
    })
}

function popFromList(key) {
    return new Promise((resolve, reject) => {
        client.lpop(key, function (err, value) {
            if (err) {
                reject()
            } else {
                resolve(value)
            }
        })
    })
}

// 阻塞
function bPopFromList(key) {
    const BLOCK_TIME = 2
    console.log('bPopFromList start', key)
    return new Promise((resolve, reject) => {
        client.blpop(key, BLOCK_TIME, function (err, value) {
            // console.log('bPopFromList key', key, 'res', err, value)
            if (value) {
                resolve(value)
            } else {
                reject()
            }
        })
    })
}

function pushIntoList(key, value) {
    return new Promise((resolve, reject) => {
        client.rpush(key, value, Redis.print)
        resolve()
    })
}



module.exports = {
    test,
    getHashField,
    getHashFieldItem,
    setHashField,
    setHashFieldItem,
    popFromList,
    bPopFromList,
    pushIntoList
}
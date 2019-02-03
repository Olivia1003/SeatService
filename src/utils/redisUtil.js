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
            // console.log('getHashField', err, value)
            if (value) {
                resolve(value)
            } else {
                reject()
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
            if (value && value.length && value[0]) {
                // console.log('getHashFieldItem success', err, value)
                resolve(value)
            } else {
                // console.log('getHashFieldItem fail', err, value)
                reject()
            }
        })
    })
}

/**
 * 设置整个field(floor)的值
 * @param {string} field 'floor1'
 * @param {string} fieldValue {seat111:'',seat222:''}
 */
function setHashField(field, fieldValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, fieldValue, Redis.print)
        resolve()
    })
}

/**
 * 设置单个seat的值
 * @param {string} field 'floor1'
 * @param {string} key 'seat111'
 * @param {string} keyValue '{date:"2019-02-16",type:1}'
 */
function setHashFieldItem(field, key, keyValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, key, keyValue, Redis.print)
        resolve()
    })
}

/**
 * 清空整个hashmap
 * @param {*} field 'floor1'
 */
function delHashField(field) {
    return new Promise((resolve, reject) => {
        client.del(field, (err, value) => {
            console.log('delHashField', field, 'result', err, value)
            resolve()
        })
    })
}


// /**
//  * 删除单个seat的值
//  * @param {*} field 'floor1'
//  * @param {*} key 'seat111'
//  * @param {*} keyValue '{date:"2019-02-16",type:1}'
//  */
// function delHashFieldItem(field, key, keyValue) {
//     return new Promise((resolve, reject) => {
//         client.hmset(field, key, keyValue, Redis.print)
//         resolve()
//     })
// }

function popFromList(key) {
    return new Promise((resolve, reject) => {
        // console.log('popFromList start', key)
        client.lpop(key, function (err, value) {
            if (value) {
                resolve(value)
            } else {
                reject()
            }
        })
    })
}

// 阻塞
function bPopFromList(key) {
    const BLOCK_TIME = 0.5
    // console.log('bPopFromList start', key)
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
    pushIntoList,
    delHashField
}
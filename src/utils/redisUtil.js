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

function setHashField(field, fieldValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, fieldValue, Redis.print)
        resolve()
    })
}

function setHashFieldItem(field, key, keyValue) {
    return new Promise((resolve, reject) => {
        client.hmset(field, key, keyValue, Redis.print)
        resolve()
    })
}

module.exports = {
    test,
    getHashField,
    getHashFieldItem,
    setHashField,
    setHashFieldItem
}
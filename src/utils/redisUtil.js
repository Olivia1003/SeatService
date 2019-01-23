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

function getHashValue(key) {
    return new Promise((resolve, reject) => {
        client.hgetall(key, function (err, value) {
            if (err) {
                reject()
                // throw err;
            } else {
                console.log('redis hash get', key, value)
                resolve(value)
            }
        })
    })
}

function setHashValue(key, value) {
    return new Promise((resolve, reject) => {
        console.log('redis hash set key value', key, value)
        client.hmset(key, value, Redis.print)
        resolve()
    })
}

module.exports = {
    test,
    getHashValue,
    setHashValue
}
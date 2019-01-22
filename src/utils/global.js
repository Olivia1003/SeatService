const globalData = {
    appId: 'wx7fc8664bf44dbec4',
    appSecret: '7959860a3ad3b5703dcdaa6b9ae86741',
}

function getGlobal(key) {
    return globalData[key]
}

function setGlobal(key, value) {
    globalData[key] = value
}

module.exports = {
    getGlobal,
    setGlobal
}
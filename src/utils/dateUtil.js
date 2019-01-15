const TIME_SEC_LEN = 30; // 每个时间段为30min
const ONE_MIN = 60 * 1000 // 一分钟的毫秒数

/**
 * 
 * @param {string} input '08:00'
 * @return {string} '08:30'
 */
function getEndTimeFromStartTime(input) {
    const startTimeObj = getDateTimeFromStr(input)
    const endTimeObj = addMinute(startTimeObj, TIME_SEC_LEN)
    const res = getStrFromDateTime(endTimeObj)
    return res
}

/**
 * 
 * @param {string} input '08:00'
 * @return {Date} 默认2019-01-01的8:00
 */
function getDateTimeFromStr(input) {
    if (!(input && input.length === 5)) {
        return new Date()
    }
    const hour = parseInt(input.slice(0, 2))
    const min = parseInt(input.slice(3, 5))
    const res = new Date(2019, 0, 1, hour, min)
    return res;
}

/**
 * 
 * @param {Date} input 2019-01-01的8:00
 * @return {string} '08:00'
 */
function getStrFromDateTime(input) {
    if (!(input instanceof Date)) {
        return '00:00'
    }
    const hh = ('0' + input.getHours()).slice(-2)
    const mm = ('0' + input.getMinutes()).slice(-2)
    const res = `${hh}:${mm}`
    return res;
}

/**
 * 
 * @param {Date} input 2019-01-01 12:00
 * @param {number} min 30
 * @return {Date} 2019-01-01 12:30
 */
function addMinute(input, min) {
    if (!(input instanceof Date)) {
        return new Date()
    }
    const res = new Date(input.getTime() + min * ONE_MIN)
    return res;
}

module.exports = {
    getEndTimeFromStartTime,
    // getDateTimeFromStr,
    // getStrFromDateTime,
    // addMinute
}
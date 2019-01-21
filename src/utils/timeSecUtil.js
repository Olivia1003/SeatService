const dateUtil = require('./dateUtil')

const TIME_SECTIONS = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
]

/**
 * @param {Array} 用数字表示的时间段，[0,1,2]
 * @return {string} 转成前端展示的格式，'08:00-12:00'
 */
function getTimeStrFromNumber() {
    const input = [0, 1, 2]
    if (input.length > 0) {
        const startIndex = input[0]
        const endIndex = input[input.length - 1]
        if (startIndex >= 0 && startIndex < TIME_SECTIONS.length &&
            endIndex >= 0 && endIndex < TIME_SECTIONS.length) {
            const startTime = TIME_SECTIONS[startIndex]
            const endTime = dateUtil.getEndTimeFromStartTime(TIME_SECTIONS[endIndex])
            return `${startTime}-${endTime}`
        }
    }
    return ''
}

/**
 * 
 * @param {Date} targetTime 
 * @param {string} date '2019-02-12'
 * @param {string} timeSecs [0, 1, 2]
 * @return true/false 是否在时间段内
 */
function isInTimeSection(targetTime, date, timeSecs) {
    if (targetTime instanceof 'Date' && date && timeSecs && timeSecs.length > 0) {
        const startIndex = timeSecs[0]
        const endIndex = timeSecs[timeSecs.length - 1]
        if (startIndex >= 0 && startIndex < TIME_SECTIONS.length &&
            endIndex >= 0 && endIndex < TIME_SECTIONS.length) {
            const startTimeStr = date + ' ' + TIME_SECTIONS[startIndex]
            const endTimeStr = date + ' ' + dateUtil.getEndTimeFromStartTime(TIME_SECTIONS[endIndex])
            const startTimeObj = dateUtil.getDateObjFromLongStr(startTimeStr)
            const endTimeObj = dateUtil.getDateObjFromLongStr(endTimeStr)
            // console.log('startTimeObj', startTimeObj)
            // console.log('endTimeObj', endTimeObj)
            // console.log('targetTime', targetTime)
            return (targetTime > startTimeObj) && (targetTime < endTimeObj)
        }
    }
    return false
}

module.exports = {
    getTimeStrFromNumber,
    isInTimeSection
}
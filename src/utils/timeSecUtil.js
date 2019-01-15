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
 * @param {Array} 用数字表示的时间段
 * @return {string} 转成前端展示的格式，'08:00-12:00,15:00-16:30'
 */
function getTimeStrFromNumber() {
    const input = [
        [0, 1, 2],
        [6, 7],
        [9]
    ]
    const resList = input.map((timeSecs) => {
        if (timeSecs.length > 0) {
            const startIndex = timeSecs[0]
            const endIndex = timeSecs[timeSecs.length - 1]
            if (startIndex >= 0 && startIndex < TIME_SECTIONS.length &&
                endIndex >= 0 && endIndex < TIME_SECTIONS.length) {
                const startTime = TIME_SECTIONS[startIndex]
                const endTime = dateUtil.getEndTimeFromStartTime(TIME_SECTIONS[endIndex])
                return `${startTime}-${endTime}`
            }
            return ''
        }
    })
    console.log('getTimeStrFromNumber resList', resList);
    const res = resList.join(',')
    return res
}

module.exports = {
    getTimeStrFromNumber
}
// listA-listB
function getSub(listA, listB) {
    const res = []
    if (listA && listA.length > 0 && listB && listB.length > 0) {
        listA.forEach((item) => {
            if (!(listB.indexOf(item) >= 0)) {
                res.push(item)
            }
        })
    }
    return res
}

// listA,listB交集
function getUnion(listA, listB) {
    const res = []
    if (listA && listA.length > 0 && listB && listB.length > 0) {
        listA.forEach((item) => {
            if (listB.indexOf(item) >= 0) {
                res.push(item)
            }
        })
    }
    return res
}

module.exports = {
    getSub,
    getUnion
}
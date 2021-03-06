const Router = require('koa-router')
const seatController = require('../controllers/seat')

let router = new Router()

const routers = router
    .get('/', seatController.getSeatInfoById)
    .get('/floor', seatController.getFloorBySchool)
    .get('/search', seatController.searchSeatList)
    .put('/rush', seatController.bookSeatRush)
    .get('/rushSearch', seatController.getRushStatus)
    .get('/seatMap', seatController.getFloorSeatList)
    // 管理端
    .get('/manage', seatController.changeSeatPosition)

module.exports = routers
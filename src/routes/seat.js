const Router = require('koa-router')
const seatController = require('../controllers/seat')

let router = new Router()

const routers = router
    .get('/', seatController.getSeatInfoById)
    .get('/floor', seatController.getFloorBySchool)
    .get('/search', seatController.searchSeatList)

module.exports = routers
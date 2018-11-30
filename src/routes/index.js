const Router = require('koa-router')

// const controllers = require('../controllers')
const seatController = require('./../controllers/seat')

let router = new Router()

// 查
// router.get('/getUserName', controllers.db.getUserName)
router.get('/getSeatInfo', seatController.getSeatInfo)

module.exports = router

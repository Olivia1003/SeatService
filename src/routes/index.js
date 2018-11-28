const Router = require('koa-router')

const controllers = require('../controllers')

let router = new Router()

// 查
router.get('/getUserName', controllers.db.getUserName)

module.exports = router

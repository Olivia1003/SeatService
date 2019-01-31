const Router = require('koa-router')
const userController = require('../controllers/user')

let router = new Router()

const routers = router
    // .get('/', userController.getUserInfoById)
    .get('/login', userController.checkUserLogin)

module.exports = routers
const Router = require('koa-router')
const router = new Router()
const { verifyToken } = require('../utils/jwt')

// 验证用户权限
const userAuth = async (ctx, next) => {}

module.exports = userAuth

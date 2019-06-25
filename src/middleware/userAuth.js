const Router = require('koa-router')
const router = new Router()
const { verifyToken } = require('../utils/jwt')

// 验证用户token权限
const userAuth = async (ctx, next) => {
  const { url = '' } = ctx
  if (url.indexOf('/login') !== -1 || url.indexOf('/register') !== -1) {
    await next()
    return;
  }
  const { X_GO_TOKEN } = ctx.request.header
  if (X_GO_TOKEN) {
    let result = verifyToken(X_GO_TOKEN)
    let { unionid } = result
    if (unionid) {
      ctx.user = {
        unionid
      }
      await next()
      return;
    }
  }
  if (url.indexOf('/checkToken') !== -1) {
    await next()
    return;
  }
  ctx.rest({ success: false, errorCode: 401, desc: '需要重新登录授权' }, status = 401)
}


module.exports = userAuth

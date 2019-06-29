const { verifyToken } = require('../utils/jwt')

// 验证用户token权限
const userAuth = async (ctx, next) => {
  const { url = '' } = ctx
  if (url.indexOf('/login') !== -1 || url.indexOf('/register') !== -1) {
    await next()
    return
  }
  const { authorization } = ctx.request.header
  try {
    if (authorization && authorization !== 'Bearer') {
      const token = authorization.replace('Bearer ', '')
      let result = await verifyToken(token)
      let { openid = '', username = '' } = result.data
      if (openid || username) {
        ctx.user = {
          openid,
          username,
        }
        await next()
        return
      }
    }
    if (url.indexOf('/checkToken') !== -1) {
      await next()
      return
    }
    ctx.rest({ success: false, errorCode: 401, desc: '需要重新登录授权' }, 401)
  } catch (error) {
    ctx.rest({ success: false, errorCode: 500, desc: error }, 500)
  }
}

module.exports = userAuth

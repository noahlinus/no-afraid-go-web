const { verifyToken } = require('../utils/jwt')

// 验证用户token权限
const userAuth = async (ctx, next) => {
  const { url = '' } = ctx
  if (url.indexOf('/login') !== -1 || url.indexOf('/register') !== -1) {
    await next()
    return
  }
  const { authorization } = ctx.request.header
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    let result = await verifyToken(token)
    let { unionid = '', username = '' } = result.data
    if (unionid || username) {
      ctx.user = {
        unionid,
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
  ctx.rest(
    { success: false, errorCode: 401, desc: '需要重新登录授权' },
    (status = 401),
  )
}

module.exports = userAuth

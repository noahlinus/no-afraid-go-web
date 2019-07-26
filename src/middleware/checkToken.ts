import { Context } from 'koa'
import { verifyToken } from '@/utils/jwt'
import Token from '@/interfaces/Token'

// 验证用户token权限 （所有controllers内部都会经过这里）
const checkToken = async (ctx: Context, next: any) => {
  const { url = '' } = ctx
  if (url.indexOf('/login') !== -1 || url.indexOf('/register') !== -1) {
    await next()
    return
  }
  const { authorization } = ctx.request.header
  try {
    if (authorization && authorization !== 'Bearer') {
      const token = authorization.replace('Bearer ', '')
      let result: any = await verifyToken(token)
      let tokenData: Token = result.data
      if (tokenData && tokenData.userId) {
        ctx.token = tokenData
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
    ctx.rest({ success: false, errorCode: 401, desc: '需要重新登录授权' }, 401)
  }
}

export default checkToken

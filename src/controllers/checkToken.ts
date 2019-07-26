import Router from 'koa-router'
const router = new Router()

// 验证token是否过期
router.get('/checkToken', async (ctx, next) => {
  if (ctx.token && ctx.token.userId) {
    ctx.rest({ success: true, desc: 'token未过期' })
    await next()
  } else {
    ctx.rest({ success: false, desc: 'token已过期或者无效，请重新登陆' })
    await next()
  }
})

export default router

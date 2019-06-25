const Router = require('koa-router')
const router = new Router()

// 验证token是否过期
router.post('/checkToken' ,async (ctx, next) => {
  if (ctx.user && ctx.user.unionid) {
    ctx.rest({ success: true, desc: 'token未过期' })
    await next()
  } else {
    ctx.rest({ success: false, desc: 'token已过期或者无效，请重新登陆' })
    await next()
  }
})

module.exports = router

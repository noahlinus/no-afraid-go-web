const Router = require('koa-router')
const router = new Router()

// 注册方式
const RegisterType = {
  PASSWORD: 'password', // 用户密码注册
  CEL: 'cel', // 手机号码注册
}

router.post('/register', async (ctx, next) => {
  const {registerType} = ctx.request.body
  switch (registerType) {
    case RegisterType.PASSWORD:
      break
    case RegisterType.WE_CHAT:
      break
  }
  await next()
})

module.exports = router

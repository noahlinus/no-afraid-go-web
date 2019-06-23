const Router = require('koa-router')
const router = new Router()

// 登录方式
LoginType = {
  PASSWORD: 'password', // 用户密码登录
  CEL: 'cel', // 手机号码登录
  WE_CHAT: 'we_chat', // 微信登录
}

// 验证账号密码
const verifyPassWord = async (ctx, next) => {
  const {username, password} = ctx.request.body
  console.log(`signin with name: ${username}, password: ${password}`)
  const {User} = require('../database/model')
  const user = await User.findAll({
    where: {
      username,
    },
  })

  if (user.length !== 0 && user[0].password === password) {
    ctx.rest({success: true, desc: '登录成功'})
  } else {
    ctx.rest({success: false, desc: '账号或者密码错误'})
  }
}

const verifyWeChat = async ctx => {}

// 登录模块
router.post('/login', async (ctx, next) => {
  const {loginType} = ctx.request.body
  switch (loginType) {
    case LoginType.PASSWORD:
      await verifyPassWord(ctx)
      break
    case LoginType.WE_CHAT:
      await verifyWeChat()
      break
  }
  await next()
})

module.exports = router

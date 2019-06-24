const Router = require('koa-router')
const router = new Router()

// 登录方式
const LoginType = {
  PASSWORD: 'password', // 用户密码登录
  CEL: 'cel', // 手机号码登录
  WE_CHAT: 'we_chat', // 微信登录
}

// 验证账号密码
const verifyPassWord = async (ctx, next) => {
  const {username, password} = ctx.request.body
  console.log(`login with name: ${username}, password: ${password}`)
  const {User} = require('../database/model')
  const user = await User.findOne({
    where: {
      username,
    },
  })

  if (user.password === password) {
    ctx.rest({success: true, desc: '登录成功'})
  } else {
    ctx.rest({success: false, desc: '账号或者密码错误'})
  }
}

// 微信验证
const verifyWeChat = async ctx => {
  const {code} = ctx.request.body
  const {getCode2Session} = require('../api/wechat')
  const res = await getCode2Session({js_code: code})
  if (!res.errcode) {
    const {openid, session_key, unionid} = res
    const {User} = require('../database/model')
    const mUser = User.findOne({
      where: {
        unionid,
      },
    })
    if (mUser) {
      mUser.openid = openid
      mUser.session_key = session_key
      mUser.unionid = unionid
      await mUser.save()
    } else {
      await User.create({
        openid,
        session_key,
        unionid,
      })
    }
    ctx.rest({
      success: true,
      data: {openid, session_key, unionid},
      desc: '登录成功',
    })
  } else {
    ctx.rest({success: false, errorCode: res.errcode, desc: res.errmsg})
  }
}

// 登录模块
router.post('/login', async (ctx, next) => {
  const {loginType} = ctx.request.body
  switch (loginType) {
    case LoginType.PASSWORD:
      await verifyPassWord(ctx)
      break
    case LoginType.WE_CHAT:
      await verifyWeChat(ctx)
      break
  }
  await next()
})

module.exports = router

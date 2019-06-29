const Router = require('koa-router')
const router = new Router()

const InitUserInfo = {
  nickName: '',
  avatarUrl: '',
  gender: 0,
  country: '',
  province: 's',
  city: '',
  language: '',
}

// 保存用户信息
router.post('/saveUserInfo', async (ctx, next) => {
  const userInfo = ctx.request.body
  const { openid } = ctx.user
  try {
    const { User } = require('../database/model')
    const user = await User.findOne({
      where: {
        openid,
      },
    })
    Object.keys(InitUserInfo).forEach(key => {
      user[key] = userInfo[key]
    })
    await user.save()
    ctx.rest({ success: true })
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const { openid } = ctx.user
  const { User } = require('../database/model')
  try {
    const user = await User.findOne({
      where: {
        openid,
      },
    })
    if (user && user.nickName) {
      const data = {}
      Object.keys(InitUserInfo).forEach(key => {
        data[key] = user[key]
      })
      ctx.rest({ success: true, data })
    } else {
      ctx.rest({ success: false, desc: '找不到用户信息' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: '找不到用户信息' })
  }
  await next()
})

module.exports = router

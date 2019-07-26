import Router from 'koa-router'
import { Context } from 'koa'
import { getCode2Session } from '@/api/wechat'
import UserModel from '@/models/User'
import { generateToken } from '@/utils/jwt'
const router = new Router()

// 登录方式
const LoginType = {
  PASSWORD: 'password', // 用户密码登录
  CEL: 'cel', // 手机号码登录
  WE_CHAT: 'we_chat', // 微信登录
  Tel: 'tel', // 电话号码登录
}

// 验证微信登录
const verifyWeChat = async (ctx: Context) => {
  // 从客户端获取到code
  const { code } = ctx.request.body
  // 登录凭证校验
  const res = await getCode2Session(code)
  if (!res.errcode) {
    const { openid, session_key } = res
    // 根据openId先从数据库查找
    let user = await UserModel.findOne({ openid })
    if (user == null) {
      // 如果找不到先保存一条
      user = new UserModel({ openid, session_key })
      await user.save()
    }
    try {
      // 生成token
      const token = await generateToken({ userId: user._id })

      // 通过本地有没有昵称判断是否已经获取了用户信息
      let hasUserInfo = !!user.userInfo

      let data: any = { token, hasUserInfo, userInfo: undefined }

      // 如果存在用户数据直接返回用户数据
      if (hasUserInfo) {
        data.userInfo = user.userInfo
      }

      ctx.rest({
        success: true,
        data,
        desc: '登录成功',
      })
    } catch (error) {
      ctx.rest({ success: false, desc: error })
    }
  } else {
    ctx.rest({ success: false, errorCode: res.errcode, desc: res.errmsg })
  }
}

// 登录模块
router.post('/login', async (ctx, next) => {
  const { loginType } = ctx.request.body
  switch (loginType) {
    // 目前只支持微信
    case LoginType.WE_CHAT:
      await verifyWeChat(ctx)
      break
    default:
      ctx.rest({ success: false, desc: '数据格式不对' })
      break
  }
  await next()
})

export default router

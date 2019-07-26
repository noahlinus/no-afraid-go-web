import UserModel, { UserInfo } from '@/models/User'
import Router from 'koa-router'
import EquipmentModel from '@/models/Equipment'
const router = new Router()

// 保存用户信息
router.post('/saveUserInfo', async (ctx, next) => {
  const userInfo: UserInfo = ctx.request.body
  const { userId } = ctx.token
  try {
    const user = await UserModel.findOne({ _id: userId })
    if (user) {
      user.userInfo = userInfo
      await user.save()
      let equipment = await EquipmentModel.findOne({ uuid: userId })

      if (!equipment) equipment = new EquipmentModel()
      equipment.uuid = userId
      equipment.name = `${userInfo.nickName}的微信设备`
      equipment.desc = '微信设备'
      await equipment.save()

      ctx.rest({ success: true })
    } else {
      ctx.rest({ success: false, desc: '找不到用户信息' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const { userId } = ctx.token
  try {
    const user = await UserModel.findOne({ _id: userId })
    if (user && user.userInfo) {
      ctx.rest({ success: true, data: user.userInfo })
    } else {
      ctx.rest({ success: false, desc: '找不到用户信息' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

router.get('/getUserScope', async (ctx, next) => {
  const { userId } = ctx.token
  try {
    const equipment = await EquipmentModel.findOne({ uuid: userId })
    if (equipment) {
      ctx.rest({ success: true, data: equipment._id })
    } else {
      ctx.rest({ success: false, desc: '找不到设备' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

export default router

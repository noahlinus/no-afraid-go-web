import EquipmentModel from '@/models/Equipment'
import UserModel from '@/models/User'
import Router from 'koa-router'
const router = new Router()

interface IAddEquipmentReq {
  eqId: string
}

interface IGetEquipmentRes {
  eqId?: string

  name?: string // 设备名称

  desc?: string // 设备描述信息}
}

// 添加设备信息
router.post('/addEquipment', async (ctx, next) => {
  const { userId } = ctx.token
  let { eqId }: IAddEquipmentReq = ctx.request.body
  try {
    const user = await UserModel.findOne(userId)
    if (user) {
      let eqIds: string[] = user.equipment || []
      eqIds.push(eqId)
      eqIds = [...new Set(eqIds)]
      user.equipment = eqIds
      await user.save()
      ctx.rest({ success: true, desc: '保存成功' })
    }
    ctx.rest({ success: true, desc: '未找到用户' })
  } catch (error) {
    ctx.rest({ success: true, desc: error })
  }
  await next()
})

router.get('/getEquipment', async (ctx, next) => {
  const { userId } = ctx.token
  try {
    const user = await UserModel.findOne(userId)
    if (user) {
      const { equipment } = user
      if (equipment) {
        const res = await EquipmentModel.find({
          $or: equipment.map(item => ({ _id: item })),
        })
        let data: Array<IGetEquipmentRes> = []
        if (res) {
          data = res.map(item => ({
            eqId: item._id,
            name: item.name,
            desc: item.desc,
          }))
        }
        ctx.rest({ success: true, data })
      }
      ctx.rest({ success: true, data: [] })
    }
    ctx.rest({ success: false, desc: '未找到用户' })
  } catch (error) {
    ctx.rest({ success: true, desc: error })
  }
  await next()
})

export default router

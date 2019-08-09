import EquipmentModel from '@/models/Equipment'
import UserModel from '@/models/User'
import Router from 'koa-router'
const router = new Router()

interface IAddEquipmentReq {
  eqId: string
  type: string
}

interface IGetEquipmentRes {
  eqId?: string // 设备ID

  name?: string // 设备名称

  desc?: string // 设备描述信息
}

// 添加设备信息
router.post('/addEquipment', async (ctx, next) => {
  const { userId } = ctx.token
  let { eqId, type }: IAddEquipmentReq = ctx.request.body
  try {
    const user = await UserModel.findOne({ _id: userId })
    if (user && eqId) {
      let eqIds: string[] = user.equipment || []
      if (eqIds.some(item => item === eqId)) {
        ctx.rest({ success: false, desc: '已经存在此设备' })
      } else {
        if (type !== 'wx') {
          // 非微信要添加到设备表  TODO 这里等真实设备在处理
          // const eq = new EquipmentModel({eqId, name: 'TODO' })
        }
        eqIds.push(eqId)
        user.equipment = eqIds
        await user.save()
        let eqRes = await EquipmentModel.findOne({ eqId })
        if (eqRes) {
          const owner = eqRes.owner || []
          owner.push(userId)
          eqRes.owner = owner
          eqRes.save()
        }
        ctx.rest({ success: true, desc: '保存成功' })
      }
    } else {
      ctx.rest({ success: false, desc: '找不到用户设备' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

// 获取设备列表，暂时无分页。。。
router.get('/getEquipment', async (ctx, next) => {
  const { userId } = ctx.token
  try {
    const user = await UserModel.findOne({ _id: userId })
    if (user) {
      const { equipment } = user
      if (equipment) {
        const res = await EquipmentModel.find({
          $or: equipment.map(item => ({ eqId: item })),
        })
        let data: Array<IGetEquipmentRes> = []
        if (res) {
          data = res.map(({ eqId, name, desc, imgUrl }) => ({
            eqId,
            name,
            desc,
            imgUrl,
          }))
        }
        ctx.rest({ success: true, data })
      } else {
        ctx.rest({ success: false, desc: '未找设备' })
      }
    } else {
      ctx.rest({ success: false, desc: '未找设备' })
    }
  } catch (error) {
    ctx.rest({ success: false, desc: error })
  }
  await next()
})

export default router

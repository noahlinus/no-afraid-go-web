import { Typegoose, prop, arrayProp } from 'typegoose'

/**
 * 设备的信息
 */
class Equipment extends Typegoose {
  @prop({ unique: true })
  eqId?: string // 设备id

  @prop()
  type?: string // 设备类型

  @prop()
  name?: string // 设备名称

  @prop()
  desc?: string // 设备描述信息

  @prop()
  imgUrl?: string // 设备图片地址

  @arrayProp({ items: String })
  owner?: string[] // 设备拥有者
}

export default new Equipment().getModelForClass(Equipment)

import { Typegoose, prop } from 'typegoose'

/**
 * 设备是信息
 */
class Equipment extends Typegoose {
  @prop()
  uuid?: string

  @prop()
  name?: string // 设备名称

  @prop()
  desc?: string // 设备描述信息
}

const EquipmentModel = new Equipment().getModelForClass(Equipment)

export default EquipmentModel

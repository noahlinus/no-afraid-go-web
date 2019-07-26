import { Typegoose, prop } from 'typegoose'
import { WxToken as IWxToken } from '../interfaces/WeChat'

// 存储微信的token (主要是为了 不需要重启的时候一直去获取)
export class WxToken extends Typegoose implements IWxToken {
  @prop()
  access_token?: string
  @prop()
  date?: number
}

export default new WxToken().getModelForClass(WxToken)

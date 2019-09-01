import { Typegoose, prop, arrayProp } from 'typegoose'

export class UserInfo extends Typegoose {
  @prop()
  unionid?: string // 微信的unionid
  @prop()
  password?: string // 密码
  @prop()
  nickName?: string // 昵称
  @prop()
  avatarUrl?: string // 头像地址
  @prop()
  gender?: number // 性别
  @prop()
  country?: string // 国家
  @prop()
  province?: string // 省份
  @prop()
  city?: string // 城市
  @prop()
  language?: string // 语言
}

// 用户数据
export class User extends Typegoose {
  @prop({ unique: true, sparse: true })
  openid?: string // 微信的openId

  @prop({ unique: true, sparse: true })
  username?: string // 用户名

  @prop({ unique: true, sparse: true })
  cel?: string // 电话

  @prop({ unique: true, sparse: true })
  email?: string // 邮箱

  @prop()
  userInfo?: UserInfo // 用户信息

  @prop()
  session_key?: string // 会话秘钥

  @arrayProp({ items: String })
  equipment?: string[] // 存放拥有设备的id

  @prop()
  eqId?: string // 生成自身的微信设备id
}

export default new User().getModelForClass(User)

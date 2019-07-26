interface BaseWeChat {
  errcode?: number
  errmsg?: string
}

/**
 * 获取的微信token数据
 */
export interface WxToken extends BaseWeChat {
  access_token?: string
  expires_in?: number
  date?: number
}

/**
 * 获取的微信登录数据
 */
export interface WxLoginInfo extends BaseWeChat {
  openid: string
  session_key: string
  unionid: string
}

/**
 * 微信token数据 （主要是定时获取微信的TOKEN）
 */
interface WeChatToken {
  accessToken: string
  tokenUpdateAt: number
}

export default WeChatToken

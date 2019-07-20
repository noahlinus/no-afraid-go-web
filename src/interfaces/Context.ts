import { Context as BaseContext } from 'koa'
import Token from './Token'
import WeChatToken from './WeChatToken'

/**
 * 统一上下文
 */
interface Context extends BaseContext {
  // Rest 统一返回方法
  rest: (data: {}, status?: number) => void
  // 微信数据
  weChatToken: WeChatToken
  // 解码后的Token数据
  token: Token
}

export default Context

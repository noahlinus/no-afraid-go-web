import Token from '../interfaces/Token'

// 定制koa模块接口
declare module 'koa' {
  // 定制上下文接口
  export interface Context extends ExtendContext {}
}

declare module 'koa-router' {
  export interface IRouterParamContext extends ExtendContext {}
}

// 定制扩展上下文
interface ExtendContext {
  // Rest 统一返回方法
  rest: (data: {}, status?: number) => void
  // 解码后的Token数据
  token: Token
  // 存放微信token
  wxToken: string
}

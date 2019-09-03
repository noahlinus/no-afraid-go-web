import { Context } from 'koa'
import { WxToken } from '@/interfaces/WeChat'
import WxTokenModel from '@/models/WxToken'
import { getWeChatToken } from '@/api/wechat'
import logger from '@/utils/logger'

const EXPIRES_IN = 7000 * 1000

// 微信相关初始化
class WeChatInit {
  private wxToken?: WxToken

  private myInterval?: NodeJS.Timeout

  // 开始循环获取token
  private beginInterval() {
    if (this.myInterval) clearInterval(this.myInterval)
    this.myInterval = setInterval(() => {
      this.queryWxToken()
    }, EXPIRES_IN)
  }

  private async saveWxToken() {
    const res = await WxTokenModel.findOne()
    if (res && this.wxToken) {
      res.access_token = this.wxToken.access_token
      res.date = Date.now()
      res.save()
    } else if (this.wxToken) {
      const model = new WxTokenModel({
        access_token: this.wxToken.access_token,
        date: Date.now(),
      })
      model.save()
    }
  }

  // 微信服务端查询
  private async queryWxToken() {
    try {
      const res = await getWeChatToken()
      console.log('getWeChatToken', res)
      if (res && !res.errmsg) {
        this.wxToken = res
        this.saveWxToken()
      }
    } catch (error) {
      logger.error(error)
    }
  }

  // 开始循环获取
  private async start() {
    await this.queryWxToken()
    this.beginInterval()
  }

  async init() {
    try {
      const res = await WxTokenModel.findOne()
      if (res && res.date) {
        this.wxToken = res
        const now = Date.now()
        if (now - res.date > EXPIRES_IN) {
          await this.start()
        } else {
          setTimeout(() => {
            this.start()
          }, EXPIRES_IN - (now - res.date))
        }
      } else {
        await this.start()
      }
    } catch (error) {
      logger.error(error)
      await this.start()
    }
  }

  public setTokenToContext = () => async (ctx: Context, next: any) => {
    if (this.wxToken && this.wxToken.access_token) {
      ctx.wxToken = this.wxToken.access_token
    }
    await next()
  }

  getWxToken = () => this.wxToken
}

export default WeChatInit

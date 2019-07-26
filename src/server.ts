import 'module-alias/register'

import Koa, { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/secrets'
import WeChatInit from './config/WeChatInit'
import controller from './utils/controller'
import rest from './middleware/rest'

const mongoUrl = MONGODB_URI
  // 设置Mongoose Promise
;(<any>mongoose).Promise = global.Promise

async function main() {
  try {
    await mongoose.connect(mongoUrl || '', { useNewUrlParser: true })
  } catch (err) {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err,
    )
    process.exit()
  }
  const wx = new WeChatInit()

  // 初始化微信相关
  await wx.init()

  const app = new Koa()

  app.use(bodyParser())

  app.use(rest)

  app.use(wx.setTokenToContext())

  app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.response.body = '<h1>Index!</h1>'
    }
    await next()
  })

  // 控制层
  app.use(controller.routes()).use(controller.allowedMethods())

  app.listen(8088)

  console.log('Server running on port 8088')
}

main()

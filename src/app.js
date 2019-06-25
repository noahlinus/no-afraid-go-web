const Koa = require('koa')

const app = new Koa()

const bodyParser = require('koa-bodyparser')

const controller = require('./controller')

const rest = require('./middleware/rest')

const weChatInit = require('./middleware/weChatInit')

async function main() {
  // 解析主体
  app.use(bodyParser())

  app.use(rest)

  app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
      ctx.response.body = '<h1>Index!</h1>'
    }
    await next()
  })

  // 获取token放入ctx.app里 这里有个定时任务
  app.use(await weChatInit())

  // 控制层
  app.use(controller.routes()).use(controller.allowedMethods())

  app.listen(8088)

  console.log('app started at port 8088...')
}

main()

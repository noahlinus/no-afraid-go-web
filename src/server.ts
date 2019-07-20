import Koa, { Context } from 'koa'
import dotenv from 'dotenv'
import bodyParser from 'koa-bodyparser'

dotenv.config()

const app = new Koa()

app.use(bodyParser())

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = '<h1>Index!</h1>'
  }
  await next()
})

app.listen(8088)

console.log('Server running on port 3000')

import Context from '@/interfaces/Context'

/**
 * REST请求
 * @param {*} ctx
 * @param {*} next
 */
const rest = async (ctx: Context, next: any) => {
  ctx.rest = (data: {}, status: number = 200) => {
    ctx.response.status = status
    ctx.response.type = 'application/json'
    ctx.response.body = data
  }
  await next()
}

module.exports = rest

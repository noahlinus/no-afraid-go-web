/**
 * REST请求
 * @param {*} ctx
 * @param {*} next
 */
const rest = async (ctx, next) => {
  ctx.rest = (data, status = 200) => {
    ctx.response.status = status
    ctx.response.type = 'application/json'
    ctx.response.body = data
  }
  await next()
}

module.exports = rest

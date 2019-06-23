const rest = async (ctx, next) => {
  ctx.rest = (data) => {
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = data;
  }
  await next();
}

module.exports = rest;

const Router = require('koa-router');
const router = new Router();

router.get('/ok', async (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = `<h1>OK!</h1>`;

  await next();
})

module.exports = router;

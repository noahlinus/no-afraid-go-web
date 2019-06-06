const Koa = require('koa');

const app = new Koa();

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = '<h1>Index!</h1>';
  }
  next();
})

app.use(bodyParser());

app.use(controller.routes()).use(controller.allowedMethods())

app.listen(3000);
console.log('app started at port 3000...');

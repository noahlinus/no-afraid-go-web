// 路由模块使用前需要先安装和实例化
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');

let urls = fs.readdirSync(__dirname + '/controllers');
urls.forEach((element) => {
  let module = require(__dirname + '/controllers/' + element)
  /*
    urls 下面的每个文件负责一个特定的功能，分开管理
    通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
  */
  router.use('/api', module.routes(), module.allowedMethods())
})

module.exports = router;

// 路由模块使用前需要先安装和实例化
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');

/**
 * 将所有controller下的文件都加载到router
 */
let urls = fs.readdirSync(__dirname + '/controllers');
urls.forEach((element) => {
  let module = require(__dirname + '/controllers/' + element)
  router.use('/api', module.routes(), module.allowedMethods())
})

module.exports = router;

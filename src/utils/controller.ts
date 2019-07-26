// 路由模块使用前需要先安装和实例化
import Router from 'koa-router'
import fs from 'fs'
import checkToken from '@/middleware/checkToken'

const router = new Router()

/**
 * 将所有controller下的文件都加载到router
 */
let urls = fs.readdirSync(__dirname + '/../controllers')

// 所有请求api路由前都要经过这个控制层
router.use('/api', checkToken)

urls.forEach((element: string) => {
  let module = require(__dirname + '/../controllers/' + element)
  router.use('/api', module.default.routes(), module.default.allowedMethods())
})

export default router

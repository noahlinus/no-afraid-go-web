const https = require('https')

// 配置访问代理，主要针对微信
const proxyOptions = {
  hostname: 'api.weixin.qq.com',
}

const getPathAndParams = (path, params) =>
  `${path}?${Object.entries(params)
    .map(item => item.join('='))
    .join('&')}`

// 封装的httpRequest
class HttpRequest {
  // GET请求
  get(path, params) {
    return new Promise((resolve, reject) => {
      const pathAndParams = getPathAndParams(path, params)
      console.log('pathAndParams', pathAndParams)
      const req = https.request(
        {...proxyOptions, method: 'get', path: pathAndParams},
        res => {
          console.log('STATUS: ' + res.statusCode)
          console.log('HEADERS: ' + JSON.stringify(res.headers))
          res.setEncoding('utf8')
          res.on('data', chunk => {
            resolve(JSON.parse(chunk))
          })
          res.on('error', e => {
            reject(e)
          })
        },
      )
      req.on('error', e => {
        reject(e)
      })
      req.end()
    })
  }

  // POST请求 时间原因用到再添加
  post() {
    // TODO
  }
}

module.exports = HttpRequest

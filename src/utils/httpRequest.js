const https = require('http')

// 配置访问代理，主要针对微信
const proxyOptions = {
  hostname: 'baidu.com',
}

// 封装HTTP请求
const httpRequest = {
  get(path, params) {
    const req = https.request({...proxyOptions, method: 'get', path}, res => {
      console.log('STATUS: ' + res.statusCode)
      console.log('HEADERS: ' + JSON.stringify(res.headers))
      res.setEncoding('utf8')
      res.on('data', chunk => {
        console.log('BODY: ' + chunk)
      })
      res.on('error', e => {
        console.log('problem with request: ' + e.message)
      })
    })
    req.on('error', e => {
      console.log('problem with request: ' + e.message)
    })
    req.end()
  },
  post() {},
}

module.exports = httpRequest

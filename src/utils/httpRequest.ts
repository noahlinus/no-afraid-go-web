import https from 'https'
import weChat from '@/const/weChat'

const getPathAndParams = (path: string, params: any) =>
  `${path}?${Object.entries(params)
    .map(item => item.join('='))
    .join('&')}`

// 封装的httpRequest
const httpRequest = {
  // GET请求
  get<T>(path: string, params: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const pathAndParams = getPathAndParams(path, params)
      // console.log('pathAndParams', pathAndParams)
      const req = https.request(
        { hostname: weChat.hostUrl, method: 'get', path: pathAndParams },
        res => {
          // console.log('STATUS: ' + res.statusCode)
          // console.log('HEADERS: ' + JSON.stringify(res.headers))
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
  },

  // POST请求 时间原因用到再添加
  // post<T>() {
  //   // TODO
  // },
}

export default httpRequest

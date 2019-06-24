const HttpRequest = require('../utils/httpRequest')

const httpRequest = new HttpRequest()

const {AppID, AppSecret} = require('../const/wechat')

// 获取微信token
const getWeChatToken = () =>
  httpRequest.get('/cgi-bin/token', {
    appid: AppID,
    secret: AppSecret,
    grant_type: 'client_credential',
  })

// 登录凭证校验
const getCode2Session = ({js_code}) =>
  httpRequest.get('/sns/jscode2session', {
    appid: AppID,
    secret: AppSecret,
    js_code,
    grant_type: 'authorization_code',
  })

module.exports = {
  getWeChatToken,
  getCode2Session,
}

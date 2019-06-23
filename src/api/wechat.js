const HttpRequest = require('../utils/httpRequest')

const httpRequest = new HttpRequest()

const { AppID, AppSecret } = require('../const/wechat')

const getWeChatToken = () => httpRequest.get('/cgi-bin/token', {
  appid: AppID,
  secret: AppSecret,
  grant_type: 'client_credential',
})

module.exports = {
  getWeChatToken
}

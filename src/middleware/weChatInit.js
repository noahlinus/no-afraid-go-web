// 凭证有效期 秒
const EXPIRES_IN = 7000

// 从数据库获取数据
const getWeChatModel = async () => {
  const {WeChat} = require('../database/model')
  const data = await WeChat.findAll()
  return data
}

// 获取已经保存的token
const getSaveToken = async weChats => {
  let accessToken = '',
    createDate = 0
  if (weChats && weChats.length > 0) {
    const {access_token, date} = weChats[0]
    accessToken = access_token
    createDate = date
  }
  return {accessToken, createDate}
}

const saveToken = async (weChats, token, date) => {
  if (weChats && weChats.length > 0) {
    const [weChat] = weChats
    weChat.date = date
    weChat.access_token = token
    await weChat.save()
  } else {
    const {WeChat} = require('../database/model')
    await WeChat.create({
      date: date,
      access_token: token,
    })
  }
}

// 从微信服务端获取token 并保存在app里
const getToken = async (weChats, app) => {
  const {getWeChatToken} = require('../api/wechat')
  const res = await getWeChatToken()
  console.log(res)
  if (res.access_token) {
    const now = Date.now()
    app.accessToken = res.access_token
    app.tokenUpdateAt = now
    await saveToken(weChats, res.access_token, now)
  }
}

// 重复刷新获取token
const refreshGetToken = (weChats, app, begin = 0) => {
  setTimeout(async () => {
    await getToken(weChats, app)
    setInterval(async () => {
      await getToken(weChats, app)
    }, EXPIRES_IN * 1000)
  }, begin)
}

// 启动时候处理微信循环获取接口凭证
const weChatInit = async () => {
  let app = {
    accessToken: '',
    tokenUpdateAt: 0,
  }
  const weChats = await getWeChatModel()
  const {accessToken, createDate} = await getSaveToken(weChats)
  const now = Date.now()
  // 如果超过时间，就获取token并保存
  if (now - createDate > EXPIRES_IN * 1000) {
    refreshGetToken(weChats, app)
  } else {
    app.accessToken = accessToken
    app.tokenUpdateAt = createDate
    refreshGetToken(weChats, app, EXPIRES_IN * 1000 - (now - createDate))
  }
  return async (ctx, next) => {
    ctx.app = app
    await next()
  }
}

module.exports = weChatInit

import httpRequest from '../utils/httpRequest'
import { WX_APP_SECRET as secret, WX_APP_ID as appid } from '../utils/secrets'
import { WxToken, WxLoginInfo } from '@/interfaces/WeChat'

// 获取微信token
export const getWeChatToken = async () =>
  httpRequest.get<WxToken>('/cgi-bin/token', {
    appid,
    secret,
    grant_type: 'client_credential',
  })

// 登录凭证校验
export const getCode2Session = (js_code: string) =>
  httpRequest.get<WxLoginInfo>('/sns/jscode2session', {
    appid,
    secret,
    js_code,
    grant_type: 'authorization_code',
  })

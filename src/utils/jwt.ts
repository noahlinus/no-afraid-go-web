import jwt from 'jsonwebtoken'
import Token from '@/interfaces/Token'

// token 秘钥
const key = process.env.TOKEN_KEY || ''

// 生成token
const generateToken = (data: Token) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        data,
      },
      key,
      {
        expiresIn: '2 days',
      },
      (err, token) => {
        if (!err) {
          return resolve(token)
        }
        return reject(err)
      },
    )
  })

// 验证Token
const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, payload) => {
      if (!err) {
        return resolve(payload)
      }
      return reject(err)
    })
  })

export { generateToken, verifyToken }

const jwt = require('jsonwebtoken')
const key = 'ting.ting@huang_GO!GO!GO!!!'

// 生成token
const generateToken = data =>
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
const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, payload) => {
      if (!err) {
        return resolve(payload)
      }
      return reject(err)
    })
  })

module.exports = {
  generateToken,
  verifyToken,
}

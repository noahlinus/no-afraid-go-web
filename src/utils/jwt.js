const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const privateKey = fs.readFileSync(
  path.join(__dirname, '../../rsa-key/rsa_private_key.pem'),
) // 私钥
const publicKey = fs.readFileSync(
  path.join(__dirname, '../../rsa-key/rsa_public_key.pem'),
) // 公钥

// 生成token
const generateToken = data =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        data,
      },
      privateKey,
      {
        algorithm: 'RS256',
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
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, payload) => {
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

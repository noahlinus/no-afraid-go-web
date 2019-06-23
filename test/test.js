// const model = require('../src/database/model.js');

// User = model.User;

// (async () => {
//   const user = await User.create({
//     username: 'John',
//     gender: 2,
//     email: '66666666@qq.com',
//     password: 'hahaha'
//   });
// })();

// const httpRequest = require('../src/utils/httpRequest.js')

// httpRequest.get('/')

const testData = {
  grant_type: 'client_credential',
  appid: '123',
  secret: '323',
}

let paramString = ''

const data = Object.entries(testData)
  .map(item => item.join('='))
  .join('&')

console.log(data)

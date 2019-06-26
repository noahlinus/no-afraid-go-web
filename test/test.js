const model = require('../src/database/model.js');

User = model.User;

(async () => {
  const user = await User.create({
    username: 'John',
    email: '66666666@qq.com',
    password: 'hahaha'
  });
})();

// const httpRequest = require('../src/utils/httpRequest.js')

// httpRequest.get('/')

// const {getWeChatToken} = require('../src/api/wechat')

// getWeChatToken().then((value) => {
//   console.log('value', value)
// }).catch(e => {
//   console.error('error', e)
// })

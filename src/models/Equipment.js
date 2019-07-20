const db = require('../database/db')
const {DataTypes} = db

module.exports = db.defineModel('equipments', {
  eq_id: { // 设备的ID  微信用open_id存储
    type: DataTypes.STRING,
    unique: true,
  },
  name: DataTypes.STRING(100), // 设备名称
  desc: DataTypes.STRING // 描述
})

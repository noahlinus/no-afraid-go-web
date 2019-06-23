const db = require('../database/db');
const { DataTypes } = db;

module.exports = db.defineModel('users', {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  cel: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  openid: {
    type: DataTypes.STRING,
    unique: true,
  },
  unionid: DataTypes.STRING,
  password: DataTypes.STRING(100),
  nickName: DataTypes.STRING(100),
  avatarUrl: DataTypes.STRING,
  gender: DataTypes.INTEGER(1),
  country: DataTypes.STRING(100),
  city: DataTypes.STRING(100),
  language: DataTypes.STRING(20),
});

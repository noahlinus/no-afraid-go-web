const db = require('../database/db');
const { DataTypes } = db;

module.exports = db.defineModel('we_charts', {
  access_token: DataTypes.STRING,
  date: DataTypes.BIGINT,
})

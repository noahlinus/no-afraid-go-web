const Sequelize = require('sequelize');
const { database, username, password, host, dialect } = require('./config');
const uuid = require('uuid');

console.log('init sequelize...');

function generateId() {
  return uuid.v4();
}

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  let attrs = { ...attributes };
  //   for (let key in attributes) {
  //       let value = attributes[key];
  //       if (typeof value === 'object' && value['type']) {
  //           value.allowNull = value.allowNull || false;
  //           attrs[key] = value;
  //       } else {
  //           attrs[key] = {
  //               type: value,
  //               allowNull: false
  //           };
  //       }
  //   }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
    if (k === 'type') {
      for (let key in Sequelize) {
        if (key === 'ABSTRACT' || key === 'NUMBER') {
          continue;
        }
        let dbType = Sequelize[key];
        if (typeof dbType === 'function') {
          if (v instanceof dbType) {
            if (v._length) {
              return `${dbType.key}(${v._length})`;
            }
            return dbType.key;
          }
          if (v === dbType) {
            return dbType.key;
          }
        }
      }
    }
    return v;
  }, '  '));
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          console.log('will create entity...' + obj);
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          console.log('will update entity...');
          obj.updatedAt = now;
          obj.version++;
        }
      }
    }
  });
}

module.exports = {
  defineModel: defineModel,
  sync: () => sequelize.sync({ force: true }),
  generateId,
  ID: ID_TYPE,
  DataTypes: Sequelize.DataTypes,
};

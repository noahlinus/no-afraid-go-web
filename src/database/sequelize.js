const config = require('./config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 3000,
  }
})

const Pet = sequelize.define('pet',
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
  },
  {
    timestamps: false
  }
);

const now = Date.now();

Pet.create({
  id: 'g-' + now,
  name: 'Gaffey',
  gender: false,
  birth: '2007-07-07',
  createdAt: now,
  updatedAt: now,
  version: 0,
}).then(p => {
  console.log('created' + JSON.stringify(p));
}).catch(err => console.error(err));

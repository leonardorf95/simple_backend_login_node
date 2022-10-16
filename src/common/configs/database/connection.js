const Sequelize = require('sequelize');
const configuration = require('./configuration');
const initialModels = require('../../../database/models');

const sequelize = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password,
  {
    host: configuration.host,
    port: configuration.port,
    dialect: configuration.dialect,
    pool: {
      max: configuration.pool.max,
      min: configuration.pool.min,
      acquire: configuration.pool.acquire,
      idle: configuration.pool.idle,
    },
  }
);

initialModels(sequelize);

module.exports = sequelize;

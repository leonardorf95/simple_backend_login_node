const env = process.env.NODE_ENV || 'development';
const path = require('path');
const config = require(path.join(
  process.cwd(),
  `src/common/configs/environments/${env}.config.json`
)).Database;

module.exports = {
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.connection.host,
  port: config.connection.port || 5432,
  dialect: config.connection.dialect,
  pool: {
    max: config.connection.pool.max,
    min: config.connection.pool.min,
    acquire: config.connection.pool.acquire,
    idle: config.connection.pool.idle,
  },
};

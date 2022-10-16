const { info } = require('../src/common/helpers/logger.helper.js');
const env = Object.create(process.env);

env.NODE_ENV || (env.NODE_ENV = 'development');

const initialServer = require('./initialServer.js');
const migrationDatabase = require('./database/migrations.js');
const seedersDatabase = require('./database/seeders');

(async () => {
  const migration = await migrationDatabase(env);
  info(`Migration finished with code: ${migration}`);

  const seeders = await seedersDatabase(env);
  info(`Seeders finished with code: ${seeders}`);
  initialServer();
})();

const { spawn } = require('child_process');
const path = require('path');
const sequelizeCli = path
  .join(process.cwd(), '/node_modules/sequelize-cli/lib/sequelize')
  .replace(/\\/g, '/');
const { info, error } = require('../../src/common/helpers/logger.helper.js');

module.exports = function (env) {
  return new Promise((resolve) => {
    const migrate = spawn(`node ${sequelizeCli} db:migrate`, [], {
      shell: true,
      env,
    });

    migrate.stdout.on('data', (data) => {
      if (data + '' != '\n') {
        info(`${data}`);
      }
    });

    migrate.stderr.on('data', (data) => {
      if (data + '') {
        error(`${data}`, sequelizeCli);
      }
    });

    migrate.on('close', (code) => {
      resolve(code);
    });
  });
};

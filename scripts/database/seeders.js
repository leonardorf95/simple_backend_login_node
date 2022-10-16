const { spawn } = require('child_process');
const path = require('path');
const sequelizeCli = path
  .join(process.cwd(), '/node_modules/sequelize-cli/lib/sequelize')
  .replace(/\\/g, '/');
const { info, error } = require('../../src/common/helpers/logger.helper.js');

module.exports = function (env) {
  return new Promise((resolve) => {
    const seed = spawn(`node ${sequelizeCli} db:seed:all`, [], {
      shell: true,
      env,
    });

    seed.stdout.on('data', (data) => {
      if (data + '' != '\n') {
        info(`${data}`);
      }
    });

    seed.stderr.on('data', (data) => {
      if (data + '') {
        error(`${data}`, sequelizeCli);
      }
    });

    seed.on('close', (code) => {
      resolve(code);
    });
  });
};

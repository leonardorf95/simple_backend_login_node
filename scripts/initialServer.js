const { spawn } = require('child_process');
const { info } = require('../src/common/helpers/logger.helper.js');

module.exports = function (env) {
  const server = spawn('nodemon bin/www.js', [], {
    shell: true,
    env,
  });

  server.stdout.on('data', (data) => {
    console.log(data + '');
  });

  server.stderr.on('data', (data) => {
    if (data + '') {
      console.error(`${data}`);
    }
  });

  server.on('close', (code) => {
    console.log(code);
  });

  info('Starting Server...');

  return server;
};

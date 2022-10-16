const env = process.env.NODE_ENV || 'development';
const path = require('path');
const http = require('http');
const nconf = require('nconf');

const { info } = require('../src/common/helpers/logger.helper.js');

nconf
  .argv()
  .env()
  .file({
    file: path.join(
      process.cwd(),
      `/common/config/environments/${env}.config.json`
    ),
  });

info(`Load configuration in mode: ${env}...`);

const server = require('../src/app.js');
const port = 8000;

const app = http.createServer(server);

app.listen(port, () => {
  info('The server is running...');
});

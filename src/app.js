const env = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');

const router = require('./api/router');

const server = express();

server.use(express.json({}));

server.use(
  express.urlencoded({
    extended: true,
    limit: '5mb',
  })
);

server.use(cors());

router(server);

server.get('*', (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: `Welcome to Simple Backend, It's running in mode ${env}`,
  });
});

module.exports = server;

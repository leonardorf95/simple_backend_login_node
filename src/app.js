const env = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const router = require('./api/router');
const passport = require('./api/session');
const authMiddleware = require('./api/middleware/auth.middleware');

const server = express();

server.use(express.json({}));

server.use(
  express.urlencoded({
    extended: true,
    limit: '5mb',
  })
);

server.use(cors());

server.use(
  session({
    secret: 'THE BEST DEVELOPER',
    resave: true,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());

server.use(passport.session());

server.use(async (req, res, next) => {
  if (!req.headers.authorization && req.url.indexOf('/app') === -1)
    return next();

  return await authMiddleware(req, res, next);
});

server.use((req, res, next) => {
  if (!req.headers.authorization && req.url.indexOf('/app') === -1)
    return next();

  return passport.authenticate('jwt', {
    session: false,
  })(req, res, next);
});

router(server);

server.get('*', (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: `Welcome to Simple Backend, It's running in mode ${env}`,
  });
});

module.exports = server;

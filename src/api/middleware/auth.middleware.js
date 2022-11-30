const env = process.env.NODE_ENV || 'development';
const path = require('path');
const jwt = require('jsonwebtoken');
const configJwt = require(path.join(
  process.cwd(),
  `/src/common/configs/environments/${env}.config.json`
)).JwtSecret;
const sessionsServices = require('../services/sessions.services');

const authMiddleware = async (req, res, next) => {
  try {
    let session;

    if (req.headers.authorization) {
      const decode = jwt.decode(
        req.headers.authorization.replace('Bearer ', ''),
        configJwt.secret
      );

      session = await sessionsServices.getSessionUser(decode.id);

      if (!session) {
        return res.status(462).json({
          statusCode: 462,
          message: 'Su sesión a caducado, favor de inicie sesión',
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.stack,
    });
  }
};

module.exports = authMiddleware;

const enumUserRole = require('../../common/helpers/enums/enumRole');
const logger = require('../../common/helpers/logger');

class RoleMiddleware {
  constructor() {}

  checkRole(...roles) {
    return (req, res, next) => {
      const user = req.user;

      const urlsAllow = [
        '/api/auth/login',
        '/api/users/active-account/',
        '/api/users/generate-token/email',
        '/api/users/update-password/token',
      ];

      if (urlsAllow.includes(req.originalUrl)) return next();

      if (roles.includes(enumUserRole.PUBLIC)) return next();

      if (!roles.includes(user.nameRole)) {
        const nameRole = req.user.nameRole ? req.user.nameRole : null;

        const endpoint = req.originalUrl;
        const role = nameRole ? nameRole : 'Unknown user';

        logger.error(
          `Role: ${role}, trying to access: ${req.hostname}${endpoint}`
        );

        return res.status(401).json({
          statusCode: 401,
          message:
            'The user does not have valid authentication credentials for the target resource.',
        });
      }

      next();
    };
  }
}

module.exports = new RoleMiddleware();

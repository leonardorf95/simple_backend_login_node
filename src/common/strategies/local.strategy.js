const { Strategy } = require('passport-local');
const rolesServices = require('../../api/services/roles.services');
const {
  validateEmail,
  setSecondsDate,
  capitalize,
} = require('../helpers/function.helpers');
const authServices = require('../services/auth.services');

module.exports = () => {
  return new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const isEmailValueInput = validateEmail(email);

        if (!isEmailValueInput) {
          return done(null, false, {
            message: 'Formato de email incorrecto',
          });
        }

        let user = await authServices.validateUser(email, password);

        if (user.error) {
          return done(null, {
            statusCode: 401,
            message: user.error,
          });
        }

        const findRole = await rolesServices.getRolById(user.roleId);
        user.role = findRole;

        const token = authServices.generateJwt(user);

        const expiredAt = setSecondsDate(token.expiresIn).format();

        await authServices.generateSession(
          user.id,
          token.access_token,
          expiredAt
        );

        req.user = user;

        const sessionData = {
          id: user.id,
          fullName: `${capitalize(user.name)} ${capitalize(user.firstName)}`,
          email: user.email,
          role: {
            id: findRole.id,
            keyRole: findRole.keyName,
          },
          session: {
            access_token: token.access_token,
            expiresIn: expiredAt,
          },
        };

        return done(null, sessionData);
      } catch (error) {
        return done(null, false, {
          message: 'Esta cuenta no existe',
        });
      }
    }
  );
};

const handlerResponse = require('../../common/handlers/response.handler');
const codes = require('../../common/helpers/errorCodes.helpers');
const sessionService = require('../services/sessions.services');
const passport = require('../session');

class AuthController {
  constructor() {}

  async login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: 'Error en el servidor',
          description: err.message || 'Error inesperado',
        });
      }

      if (!user) {
        // Cuando la estrategia retorna done(null, false, { message: ... })
        return res.status(401).json({
          message: info?.message || 'Credenciales inválidas',
        });
      }

      // Autenticación exitosa
      return res.status(200).send(user); // `user` contiene tu sessionData
    })(req, res, next);
  }


  async logout(req, res) {
    const userId = req.user.id;

    try {
      const response = await sessionService.destroySession(userId);

      const result = {
        message: codes.OK,
        description: 'Se cerró sesión con éxito.',
        outPut: response,
      };

      return handlerResponse.success(result, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }
}

module.exports = new AuthController();

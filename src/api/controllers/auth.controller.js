const handlerResponse = require('../../common/handlers/response.handler');
const codes = require('../../common/helpers/errorCodes.helpers');
const sessionService = require('../services/sessions.services');

class AuthController {
  constructor() {}

  async login(req, res) {
    return res.status(200).send(req.user);
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

const handlerResponse = require('../../common/handlers/response.handler');
const codes = require('../../common/helpers/errorCodes.helpers');
const usersServices = require('../services/users.services');

class UsersController {
  constructor() {}

  async createUser(req, res) {
    try {
      const payload = req.body;

      const response = await usersServices.createUser(payload);

      const result = {
        message: codes.Created,
        description: 'El usuario se creó con éxito.',
        outPut: response,
      };

      return handlerResponse.success(result, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const response = await usersServices.getUserById(+id);

      const result = {
        message: codes.OK,
        description: 'Información obtenida con éxito.',
        outPut: response,
      };

      return handlerResponse.success(result, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }

  async getAllUsers(req, res) {
    const user = req.user;
    let queries = req.query;

    try {
      const response = await usersServices.getAllUsers(queries);

      const result = {
        message: codes.OK,
        description: 'Información obtenida con éxito.',
        outPut: response,
      };

      return handlerResponse.success(result, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }
}

module.exports = new UsersController();

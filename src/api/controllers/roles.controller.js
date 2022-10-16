const handlerResponse = require('../../common/handlers/response.handler');
const codes = require('../../common/helpers/errorCodes.helpers');
const rolesServices = require('../services/roles.services');

class RolesController {
  constructor() {}

  async getAllRoles(req, res) {
    try {
      const findAll = await rolesServices.getAllRoles();

      const response = { message: codes.OK, outPut: findAll };

      return handlerResponse.success(response, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }

  async createRole(req, res) {
    const payload = req.body;

    try {
      const newRole = await rolesServices.createRoles(payload);

      const response = { message: codes.OK, outPut: newRole };

      return handlerResponse.success(response, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }

  async updateRole(req, res) {
    const { id } = req.params;
    const payload = req.body;

    try {
      const updatedRole = await rolesServices.updateRole(id, payload);

      const response = { message: codes.OK, outPut: updatedRole };

      return handlerResponse.success(response, res);
    } catch (error) {
      return handlerResponse.error(error, res);
    }
  }
}

module.exports = new RolesController();

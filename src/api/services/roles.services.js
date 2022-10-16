const { error } = require('../../common/helpers/logger.helper');
const { models } = require('../../common/configs/database/connection');
const codes = require('../../common/helpers/errorCodes.helpers');

class RolesServices {
  #_roles = null;

  constructor() {
    this.#_roles = models.roles;
  }

  async createRoles(payload) {
    try {
      return await this.#_roles.create(payload);
    } catch (exception) {
      error('Error en RolesService.createRoles: ', exception);
      throw exception;
    }
  }

  async getAllRoles() {
    try {
      return await this.#_roles.findAll({ order: [['id', 'ASC']] });
    } catch (exception) {
      error('Error en RolesService.getAllRoles: ', exception);
      throw exception;
    }
  }

  async getRolById(id) {
    try {
      return await this.#_roles.findOne({ where: { id } });
    } catch (exception) {
      error('Error en RolesService.getRolById: ', exception);
      throw exception;
    }
  }

  async updateRole(id, payload) {
    try {
      const findRole = await this.getRolById(id);

      if (!findRole) {
        const errorException = new Error();
        errorException.message = codes['Not Found'];
        errorException.description = 'No se encontro el role';
        errorException.stack = errorException.stack;
        throw errorException;
      }

      return await findRole.update(payload);
    } catch (exception) {
      error('Error en RolesService.updateRole: ', exception);
      throw exception;
    }
  }

  async deleteRole(role) {
    try {
      return await role.destroy();
    } catch (exception) {
      error('Error en RolesService.deleteRole: ', exception);
      throw exception;
    }
  }
}

module.exports = new RolesServices();

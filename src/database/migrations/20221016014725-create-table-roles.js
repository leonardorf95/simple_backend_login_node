'use strict';

const { ROLES_TABLE, rolesModel } = require('../models/roles.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(ROLES_TABLE, rolesModel);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable(ROLES_TABLE);
  },
};

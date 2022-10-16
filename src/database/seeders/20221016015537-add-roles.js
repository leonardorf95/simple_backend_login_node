'use strict';

const { ROLES_TABLE } = require('../models/roles.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(ROLES_TABLE, [
      {
        id: 1,
        name: 'Super Administrador',
        key_name: 'SUPER_ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Administrador',
        key_name: 'ADMINISTRATOR',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Cliente',
        key_name: 'CUSTOMER',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(ROLES_TABLE, null, {});
  },
};

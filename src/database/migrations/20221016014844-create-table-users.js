'use strict';

const { USERS_TABLE, usersModel } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(USERS_TABLE, usersModel);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable(USERS_TABLE);
  },
};

'use strict';

const { SESSION_TABLE, sessionModel } = require('../models/sessions.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(SESSION_TABLE, sessionModel);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable(SESSION_TABLE);
  },
};

'use strict';

const bcrypt = require('bcrypt');
const usersServices = require('../../api/services/users.services');
const { USERS_TABLE } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const findUser = await usersServices.getUserById(1);

    if (!findUser) {
      return await queryInterface.bulkInsert(
        USERS_TABLE,
        [
          {
            id: 1,
            role_id: 1,
            name: 'Development',
            first_name: 'Account',
            email: 'development@devs.mx',
            phone_number: '3241266279',
            password: await bcrypt.hash('12345678', 12),
            is_verified: true,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(USERS_TABLE, null, {});
  },
};

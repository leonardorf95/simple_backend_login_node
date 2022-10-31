const router = require('express-promise-router')();
const enumRoles = require('../../common/enums/roles.enum');
const usersController = require('../controllers/users.controller');

router.route('/').get(usersController.createUser);

module.exports = {
  route: 'users',
  endpoints: router,
};

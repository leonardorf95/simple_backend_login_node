const router = require('express-promise-router')();
const enumRoles = require('../../common/enums/roles.enum');
const usersController = require('../controllers/users.controller');

router.route('/').post(usersController.createUser);

router.route('/').get(usersController.getAllUsers);

router.route('/:id').get(usersController.getUserById);

module.exports = {
  route: 'users',
  endpoints: router,
};

const router = require('express-promise-router')();
const enumRoles = require('../../common/enums/roles.enum');
const rolesController = require('../controllers/roles.controller');

router.route('/').get(rolesController.getAllRoles);

router.route('/').post(rolesController.createRole);

router.route('/:id').put(rolesController.updateRole);

module.exports = {
  route: 'roles',
  endpoints: router,
};

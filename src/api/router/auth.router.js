const router = require('express-promise-router')();
const authController = require('../controllers/auth.controller');

router.route('/login').post(authController.login);

router.route('/logout').get(authController.logout);

module.exports = {
  route: 'auth',
  endpoints: router,
};

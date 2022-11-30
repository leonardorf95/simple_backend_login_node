const path = require('path');
const passport = require('passport');
const { info } = require('../common/helpers/logger.helper');

const strategies = path.join(process.cwd(), '/src/common/strategies');

passport.use('local', require(`${strategies}/local.strategy`)());
passport.use('jwt', require(`${strategies}/jwt.strategy`)());

info('Sessions service started...');

module.exports = passport;

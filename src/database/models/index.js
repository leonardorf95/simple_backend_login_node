const { info } = require('../../common/helpers/logger.helper.js');

// Import models.
const { Roles, rolesModel } = require('./roles.model.js');
const { Users, usersModel } = require('./users.model.js');
const { Sessions, sessionModel } = require('./sessions.model.js');

// Models initialization.
const initialModels = (sequelize) => {
  Roles.init(rolesModel, Roles.config(sequelize));
  Users.init(usersModel, Users.config(sequelize));
  Sessions.init(sessionModel, Sessions.config(sequelize));

  /// TODO: Association initialization.
  Roles.associate(sequelize.models);
  Users.associate(sequelize.models);
  Sessions.associate(sequelize.models);
};

info('Models Loaded...');

module.exports = initialModels;

const env = process.env.NODE_ENV || 'development';
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sessionsServices = require('../../api/services/sessions.services');
const usersServices = require('../../api/services/users.services');
const { capitalize } = require('../helpers/function.helpers');
const configJwt = require(path.join(
  process.cwd(),
  `/src/common/configs/environments/${env}.config.json`
)).JwtSecret;

class AuthService {
  constructor() {}

  async validateUser(email, password) {
    const user = await usersServices.getValidUser(email);

    if (!user) return { error: 'Cuenta inexistente' };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return { error: 'Credenciales incorrectas y/o usuario no verificado' };

    return user;
  }

  generateJwt(user) {
    const payload = {
      id: user.id,
      fullName: `${capitalize(user.name)} ${capitalize(user.firstName)}`,
      email: user.email,
      roleId: user.role.id,
      keyRole: user.role.keyName,
    };

    const expiresIn = 60 * 60 * 24;

    return {
      access_token: jwt.sign(payload, configJwt.secret, { expiresIn }),
      expiresIn,
    };
  }

  async generateSession(id, token, expiredAt) {
    await sessionsServices.createSession({
      userId: id,
      token,
      expiredAt,
    });
  }
}

module.exports = new AuthService();

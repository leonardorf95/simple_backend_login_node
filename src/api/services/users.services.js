const env = process.env.NODE_ENV || 'development';
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { error } = require('../../common/helpers/logger.helper');
const { models } = require('../../common/configs/database/connection');
const codes = require('../../common/helpers/errorCodes.helpers');
const rolesServices = require('./roles.services');
const {
  validateEmail,
  generateRandomPassword,
  validatePhoneNumber,
} = require('../../common/helpers/function.helpers');
const nodemailerServices = require('../../common/services/nodemailer.services');
const configServer = require(path.join(
  process.cwd(),
  `/src/common/configs/environments/${env}.config.json`
)).Server;

class UsersServices {
  #_users = null;

  constructor() {
    this.#_users = models.users;
  }

  async createUser(payload) {
    try {
      let tempPassword = '';

      if (!payload.password || payload.password === '') {
        tempPassword = generateRandomPassword();
      } else {
        tempPassword = payload.password;
      }

      const phoneNumber = payload.phoneNumber
        ? payload.phoneNumber.replace(/\D/g, '').slice(-10)
        : '';

      if (!validatePhoneNumber(phoneNumber)) {
        const errorException = new Error();
        errorException.message = codes['Bad Request'];
        errorException.description = 'Número de teléfono incorrecto';
        throw errorException;
      }

      const email = payload.email.trim();

      if (!validateEmail(email)) {
        const errorException = new Error();
        errorException.message = codes['Bad Request'];
        errorException.description =
          'El correo electrónico tiene un formato inválido';
        throw errorException;
      }

      const findRole = await rolesServices.getRolById(payload.roleId);

      if (!findRole) {
        const errorException = new Error();
        errorException.message = codes['Not Found'];
        errorException.description = 'El rol enviado no exite';
        throw errorException;
      }

      const findUserByEmail = await this.#_users.findOne({
        where: { email },
      });

      if (findUserByEmail) {
        const errorException = new Error();
        errorException.message = codes['Bad Request'];
        errorException.description =
          'El correo electrónico ingresado ya existe';
        throw errorException;
      }

      const findUserByPhone = await this.#_users.findOne({
        where: { phoneNumber },
      });

      if (findUserByPhone) {
        const errorException = new Error();
        errorException.message = codes['Bad Request'];
        errorException.description = 'El teléfono ingresado ya existe';
        throw errorException;
      }

      const hashPassword = await bcrypt.hash(tempPassword, 12);
      const tokenActivation = uuidv4();

      const model = {
        name: payload.name.trim().toLowerCase(),
        firstName: payload.firstName.trim().toLowerCase(),
        email,
        phoneNumber,
        password: hashPassword,
        tokenActivation,
        roleId: payload.roleId,
      };

      const user = await this.#_users.create(model);
      const url = `${configServer.url}/api/users/activate-account/${user.tokenActivation}`;
      // const payloadEmail = {
      //   to: user.email,
      //   subject: 'Bienvenidoa a Developers mx',
      //   text: `Para activar tu cuenta haz clic en el siguiente enlace <a href="${url}">Clic Aqui</a> `,
      // };
      // await nodemailerServices.sendEmail(payloadEmail);
      user.dataValues.url = url;
      return user;
    } catch (exception) {
      error('Error en UsersService.createUser: ', exception);
      throw exception;
    }
  }

  async getUserById(id) {
    try {
      return await this.#_users.findOne({ where: { id } });
    } catch (exception) {
      error('Error en UsersService.getUserById: ', exception);
      throw exception;
    }
  }

  async updateUser(user, payload) {
    try {
      return await user.update(payload);
    } catch (exception) {
      error('Error en UsersService.updateUser: ', exception);
      throw exception;
    }
  }

  async activeUser(tokenActivation) {
    try {
      const findUser = await this.#_users.findOne({
        where: { tokenActivation },
      });

      if (!findUser) {
        const error = new Error();
        error.message = codes['Bad Request'];
        error.description = 'No se encontro el usuario.';
        error.stack = error.stack;
        error.path = __filename;
        throw error;
      }

      findUser.isVerified = true;
      const newTokenActivation = uuidv4();
      findUser.tokenActivation = newTokenActivation;

      return await findUser.save();
    } catch (error) {
      error('Error en UsersService.activeUser: ', error);
      throw error;
    }
  }

  async getValidUser(email) {
    try {
      return await this.#_users.findOne({
        where: { email, isVerified: true },
      });
    } catch (error) {
      error('Error en UsersService.getValidUser: ', error);
      throw error;
    }
  }

  async generateNewToken(email) {
    try {
      const findUser = await this.#_users.findOne({ where: { email } });

      if (!findUser) {
        const errorException = new Error();
        errorException.message = codes['Bad Request'];
        errorException.description = 'El teléfono ingresado ya existe';
        throw errorException;
      }

      const tokenActivation = uuidv4();

      findUser.tokenActivation = tokenActivation;
      await findUser.save();

      const url = `${configServer.url}/api/users/forgot-password/${tokenActivation}`;

      const options = {
        to: email,
        from: 'soporte@karlo.io',
        subject: 'Recuperar contraseña',
        templateId: enumEmailTemplate.RESET_PASSWORD,
        dynamic_template_data: {
          nombre: findUser.name,
          url,
        },
      };

      await sendgridApi.send(options);
    } catch (error) {
      error('Error en UsersService.generateNewToken: ', error);
      throw error;
    }
  }

  async updatePassword(tokenActivation, password) {
    try {
      const findUser = await this.#_users.findOne({
        where: { tokenActivation },
      });

      if (!findUser) {
        const error = new Error();
        error.message = 'Bad Request';
        error.description = 'No se encontro el usuario.';
        error.stack = error.stack;
        error.path = __filename;
        throw error;
      }

      const hashPassword = await bcrypt.hash(password, 12);

      findUser.password = hashPassword;

      return await findUser.save();
    } catch (error) {
      error('Error en UsersService.updatePassword: ', error);
      throw error;
    }
  }
}

module.exports = new UsersServices();

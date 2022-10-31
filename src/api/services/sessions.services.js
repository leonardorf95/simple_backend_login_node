const { models } = require('../../common/configs/database/connection');

class SessionsService {
  #_sessions = null;

  constructor() {
    this.#_sessions = models.sessions;
  }

  async createSession(payload) {
    try {
      return await this.#_sessions.create({
        userId: payload.userId,
        token: payload.token,
        expiredAt: payload.expiredAt,
      });
    } catch (exception) {
      error('Error en SessionsService.createSession: ', exception);
      throw exception;
    }
  }

  async getSessionUser(userId) {
    try {
      return await this.#_sessions.findOne({ where: { userId } });
    } catch (exception) {
      error('Error en SessionsService.getSessionUser: ', exception);
      throw exception;
    }
  }

  async destroySession(userId) {
    try {
      return await this.#_sessions.destroy({
        where: {
          userId,
        },
      });
    } catch (exception) {
      error('Error en SessionsService.destroySession: ', exception);
      throw exception;
    }
  }
}

module.exports = new SessionsService();

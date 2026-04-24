const constants = require('../constants/status');
const logger = require('../utils/logger');

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(constants.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: constants.MESSAGES.UNAUTHORIZED
    });
  }

  if (req.user.role !== constants.USER_ROLE.ADMIN) {
    logger.warn(`❌ Acceso denegado a usuario no admin: ${req.user.email}`);
    return res.status(constants.HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: constants.MESSAGES.FORBIDDEN
    });
  }

  next();
};

module.exports = requireAdmin;

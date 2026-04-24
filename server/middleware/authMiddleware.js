const jwt = require('jsonwebtoken');
const User = require('../models/User');
const environment = require('../config/environment');
const { ApiError } = require('../utils/errorHandler');
const constants = require('../constants/status');
const logger = require('../utils/logger');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new ApiError(
        constants.HTTP_STATUS.UNAUTHORIZED,
        constants.MESSAGES.TOKEN_MISSING
      );
    }

    const decoded = jwt.verify(token, environment.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new ApiError(
        constants.HTTP_STATUS.UNAUTHORIZED,
        constants.MESSAGES.USER_NOT_FOUND
      );
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Error de autenticación: ${error.message}`);
    next(new ApiError(constants.HTTP_STATUS.UNAUTHORIZED, constants.MESSAGES.TOKEN_INVALID));
  }
};

module.exports = authMiddleware;

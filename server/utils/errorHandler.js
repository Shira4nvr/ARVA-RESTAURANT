const constants = require('../constants/status');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.message = err.message || constants.MESSAGES.ERROR;

  // Validación de errores de Mongoose
  if (err.name === 'CastError') {
    const message = `ID inválido: ${err.value}`;
    err = new ApiError(constants.HTTP_STATUS.BAD_REQUEST, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    err = new ApiError(constants.HTTP_STATUS.BAD_REQUEST, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode
  });
};

module.exports = {
  ApiError,
  errorHandler
};
